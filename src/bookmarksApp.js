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

const generateBookmarksString = function (bookmarksList) {
  const items = bookmarksList.map((item) => generateItemElement(item));
  return items.join('');
};



const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const handleNewItemClicked = function () {};

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
      });
  });


};

const handleCloseViewClicked = function() {};

const handleCreateSubmit = function() {};

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