// Render and Event Listeners
import store from './store.js';
import api from './api.js';
//import view from './view.js';

const render = function() {
  renderError();
  let bookmarks = [...store.store.bookmarks];
  // this holds the value for the filtered number of stars (ie sort by 3 stars and above)
  let filteredStars = store.store.filter;
  // test value to see if it works: filteredStars = 3;

  const bookmarkItemsString = generateBookmarksString(bookmarks, filteredStars);
  // Adds the initial view with the bookmarks html generated
  const initialViewString = generateInitView(bookmarkItemsString);


  if(store.store.adding === true) {
    $('header').addClass('hidden');
    return generateAddBookmarkView();
  } else {
    $('header').removeClass('hidden');
    $('main').html('');
    $('main').html(initialViewString);
  }
};

const renderError = function() {
  if (store.error) {
    const el = generateError(store.error);    
    $('.error-container').html(el);  
  } else {
    $('.error-container').empty();
  }
};

const generateError = function (message) {
  return `
        <button id="cancel-error"><i class="fas fa-times"></i></button>
        <p>${message}</p>
    `;
};

// This generates the initial view (headers, buttons, etc) and adds any bookmarks from the database
const generateInitView = function(bookmarkItemsString) {
  const filterValue = $('#star-select').val();
  // This will update the value in the dropdown to be whatever the current filter is:
  // (i.e. if the filter is set to 2 stars, it will show 2 stars in the select box)
  let filterText = '(i.e 3 or more)';
  if(filterValue) {
    filterText = '&#xf005'.repeat(filterValue);
  }
  if(filterValue === '0') {
    filterText = '0 Stars';
  }
  let initString = `
  <section class="init-view"> <!-- div or nav? -->
      <button id="new-bookmark-button">New<i class="fas fa-bookmark"></i></button>
      <label for="star-select">Filter by Stars:
  
      <select name="star-filter" id="star-select">
          <option class="hidden" value="">${filterText}</option>
          <option value="0">0 Stars</option>
          <option value="1">&#xf005;</i></option>
          <option value="2">&#xf005;&#xf005;</option>
          <option value="3">&#xf005;&#xf005;&#xf005;</option>
          <option value="4">&#xf005;&#xf005;&#xf005;&#xf005;</option>
          <option value="5">&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;</option>
      </select>
      </label>
  </section>
  <section>
      <ul class="js-bookmarks-list">`;

  let initViewString = initString.concat(bookmarkItemsString);

  return initViewString + '  </section>';

};

// This generates each item for the Inital view and expands any items that need to be expanded
const generateItemElement = function (item, filterNum) {

  let numOfStars = item.rating;
  let numEmpty = 5 - item.rating;
  let fullStar = `<i class="fas fa-star"></i>`;
  let emptyStar = `<i class="far fa-star"></i>`;
  // if the rating of this element is less than the Filter by Stars Value (i.e. 3 or more) then return none
  if(item.rating < filterNum) {
    return '';
  }
  // if the expanded property is true, this will return
  if (!item.expanded) {
    return `
    <li class="js-item-element" data-item-id="${item.id}"><p>${item.title}</p><span class="stars">${fullStar.repeat(numOfStars)}${emptyStar.repeat(numEmpty)}
        <i class="js-item-delete fas fa-trash-alt"></i></span>`;
  } 
  // if the expanded property is false, this will return
  return `
        <li class="js-item-element" data-item-id="${item.id}"><p>${item.title}</p><span class="stars">${fullStar.repeat(numOfStars)}${emptyStar.repeat(numEmpty)}
        <i class="js-item-delete fas fa-trash-alt"></i></span>
        <span class="description">
        <p><a href="${item.url}" class="visit_button">Visit Site</a><i class="fas fa-star"></i>
        ${item.desc}</p></span>`;
  
};

const generateAddBookmarkView = function() {
  let addingViewString = `    <form id="add-bookmark-form">
  <i class="js-item-close fas fa-times"></i>
  <h2>Add New Bookmark</h2> <!-- delete this after-->
  <label for="new-bookmark">Enter Website URL:</label>
  <input type="text" id="new-bookmark" name="bookmark-url" required minlength="4" size="25" placeholder="https://www.example-url.com" required>
  <fieldset>
      <label for="name-new-bookmark"></label>
      <input type="text" id="name-new-bookmark" name="bookmark-title" required minlength="4" size="20" placeholder="Title of Bookmark here" required>
      <div class="rating">
          <label>Rate</label>
          <span><input class="with-font" type="radio" name="rating" id="str1" value="1"><label for="str1">1</label></span>
          <span><input class="with-font" type="radio" name="rating" id="str2" value="2"><label for="str2">2</label></span>
          <span><input class="with-font" type="radio" name="rating" id="str3" value="3"><label for="str3">3</label></span>
          <span><input class="with-font" type="radio" name="rating" id="str4" value="4"><label for="str4">4</label></span>
          <span><input class="with-font" type="radio" name="rating" id="str5" value="5"><label for="str5">5</label></span>
      </div>
      <label for="description-text"></label>
      <textarea id="description-text" name="bookmark-description" rows="5" cols="33" placeholder="Type your description here..."></textarea>
      
  </fieldset>
  <button id="create-bookmark-button">Create</button>
</form>`;
  $('main').html('');
  $('main').html(addingViewString);
};

const generateBookmarksString = function (bookmarksList, filterNum) {
  const items = bookmarksList.map((item) => generateItemElement(item, filterNum));
  return items.join('');
};


const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

/* 
  Reactful Pattern: Event Listeners
  1) (optional) Get info from DOM related to user action
  2) Change the store
  3) Render
*/
const handleCloseError = function () {
  $('body').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const handleNewItemClicked = function () {
  // This will hide the current views not needed
  // show the correct view to add a new bookmark
  $('body').on('click', '#new-bookmark-button', event => {
    console.log('new bookmark clicked');
    //store.store.adding = true;
    store.toggleAdding();
    render();
  });
};

const handleFilterClicked = function() {
  $('body').on('change', '#star-select', event => {
    event.preventDefault();
    const filterValue = parseInt($('#star-select').val());
    console.log(filterValue);
    store.store.filter = filterValue;
    // store.bookmarks.forEach(element => element.expanded = false);
    //render(filterValue);
    //document.getElementById('star-select').value = store.store.filter;
    render();
  });  
};

const handleBookmarkTitleClicked = function() {
  $('body').on('click', '.js-item-element', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const clickedBookmark = store.findById(id);
    console.log(id);
    store.findAndUpdate(id, {expanded: !clickedBookmark.expanded});
    render();
  });
};

const handleDeleteBookmarkClicked = function() {
  $('body').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    // makes a DELETE request to the server
    // Gets the response
    // updates the store and renders page
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(`This is the error: ${error.message}`);
        store.setError(error.message);
        renderError();
      });
  });


};

const handleCloseViewClicked = function() {
  // This will handle when the big X is clicked on the addBookmarkView
  // and return back to the inital view
  $('main').on('click', '.js-item-close', event => {
    store.toggleAdding();
    // clears any errors if this is successful
    store.setError(null);
    render();
  });
};

const getFormData = function() {
  // This will get all the data from our inputs and parse the data into an object
  // that we can use to make POST requests with the bookmarks API
  let myForm = document.getElementById('add-bookmark-form');
  let formData = new FormData(myForm); // FormData is an object that has all the input data as key-value pairs
  let myFormData = {
    title: formData.get('bookmark-title'),
    url: formData.get('bookmark-url'),
    desc: formData.get('bookmark-description'),
    rating: formData.get('rating')
  };
  //console.log(`myFormData keys: ${Object.keys(myFormData)} myFormData values: ${Object.values(myFormData)}`);

  return myFormData;
};

const handleCreateSubmit = function() {
  // this will create a POST request from the formdata()
  // get the response and put that into store
  // set store.store.adding back to false
  // and render the page correctly.

  $('main').on('submit', '#add-bookmark-form', event => {
    event.preventDefault();
    const formData = getFormData(); // This will get all the data from all our inputs and return an object we can use for POST

    // this will create a POST request from the formdata()
    api.createBookmark(formData)
      .then(newBookmark => {
        // get the response and put that into store
        store.addItem(newBookmark);
        // set store.store.adding back to false
        store.toggleAdding();
        // clears any errors if this is successful
        store.setError(null);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        console.log(store.error);
        renderError();
      });

  });

};

const bindEventListeners = function() {
  handleNewItemClicked();
  handleFilterClicked();
  handleBookmarkTitleClicked();
  handleDeleteBookmarkClicked();
  handleCloseViewClicked();
  handleCreateSubmit();
  handleCloseError();
};

export default {
  render,
  renderError,
  bindEventListeners
};