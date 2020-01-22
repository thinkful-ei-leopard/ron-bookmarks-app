// Render and Event Listeners
import store from './store.js';
import api from './api.js';
//import view from './view.js';

const render = function() {
  renderError();
  let bookmarks = [...store.store.bookmarks];
  // render the shopping list in the DOM
  const bookmarkItemsString = generateBookmarksString(bookmarks);
  
  // insert that HTML into the DOM
  $('.js-bookmarks-list').html(bookmarkItemsString);
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
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};
// This generates each item for the Inital view and expands any items that need to be expanded
const generateItemElement = function (item) {

  let numOfStars = item.rating;
  let numEmpty = 5 - item.rating;
  let fullStar = `<i class="fas fa-star"></i>`;
  let emptyStar = `<i class="far fa-star"></i>`;
  // if the expanded property is true, this will return
  if (!item.expanded) {
    return `
    <li class="js-item-element" data-item-id="${item.id}"><p>${item.title}</p><span class="stars">${fullStar.repeat(numOfStars)}${emptyStar.repeat(numEmpty)}
        <i class="fas fa-ellipsis-h"></i><i class="js-item-delete fas fa-trash-alt"></i><i class="fas fa-edit"></i></span>`;
  } 
  // if the expanded property is false, this will return
  return `
        <li class="js-item-element" data-item-id="${item.id}"><p>${item.title}</p><span class="stars">${fullStar.repeat(numOfStars)}${emptyStar.repeat(numEmpty)}
        <i class="fas fa-ellipsis-h"></i><i class="js-item-delete fas fa-trash-alt"></i><i class="fas fa-edit"></i></span>
        <span class="description">
        <p><a href="${item.url}" class="visit_button">Visit Site</a><i class="fas fa-star"></i>
        ${item.desc}</p></span>`;
  
};

const generateAddBookmarkView = function() {
  return `    <form id="add-bookmark-form">
  <i class="js-item-close fas fa-times"></i>
  <h2>Add New Bookmark</h2> <!-- delete this after-->

  <label for="new-bookmark">Add New Bookmark</label>
  <input type="text" id="new-bookmark" name="add-bookmark" required minlength="4" size="20" placeholder="URL here" required>
  <fieldset>
      <label for="name-new-bookmark"></label>
      <input type="text" id="name-new-bookmark" name="title-bookmark" required minlength="4" size="20" placeholder="Title of Bookmark here" required>


      <div class="rating">
          <span><input type="radio" name="rating" id="str5" value="5"><label for="str5"></label></span>
          <span><input type="radio" name="rating" id="str4" value="4"><label for="str4"></label></span>
          <span><input type="radio" name="rating" id="str3" value="3"><label for="str3"></label></span>
          <span><input type="radio" name="rating" id="str2" value="2"><label for="str2"></label></span>
          <span><input type="radio" name="rating" id="str1" value="1"><label for="str1"></label></span>
      </div>

      <label for="description-text"></label>
      <textarea id="description-text" name="bookmark-description" rows="5" cols="33" placeholder="Type your description here..."></textarea>
      
  </fieldset>
  <button id="create-bookmark">Create</button>
</form>`;
};

const generateBookmarksString = function (bookmarksList) {
  const items = bookmarksList.map((item) => generateItemElement(item));
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
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const handleNewItemClicked = function () {
  // This will hide the current views not needed
  // show the correct view to add a new bookmark
  $('#new-bookmark-button').on('click', event => {
    console.log('new bookmark clicked');
    $('.js-bookmarks-list').addClass('hidden');
    $('.init-view').addClass('hidden');
    $('.container').html(generateAddBookmarkView);
  });
};

const handleFilterClicked = function() {};

const handleBookmarkTitleClicked = function() {
  $('.js-bookmarks-list').on('click', '.js-item-element', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const clickedBookmark = store.findById(id);
    console.log(id);
    store.findAndUpdate(id, {expanded: !clickedBookmark.expanded});
    render();
  });
};

const handleDeleteBookmarkClicked = function() {
  $('.js-bookmarks-list').on('click', '.js-item-delete', event => {
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

const handleCloseViewClicked = function() {};

const handleCreateSubmit = function() {
  // this will create a POST request from the formdata()
  // get the response and put that into store
  // and render the page correctly.
  $('main').on('submit', '#add-bookmark-form', event => {
    event.preventDefault();
    // // <form id="addBookmarkForm">
    
    let myForm = document.getElementById('add-bookmark-form');
    let formData = new FormData(myForm);
    console.log(formData);
    for(const entry of formData.entries()) {
      console.log(entry);
    }
    console.log('testing Create Submit button');
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