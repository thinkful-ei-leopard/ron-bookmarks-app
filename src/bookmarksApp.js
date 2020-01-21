// Render and Event Listeners
import store from './store.js';

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

const generateItemElement = function (item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  console.log(item);
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }
  let numOfStars = item.rating;
  let numEmpty = 5 - item.rating;
  let fullStar = `<i class="fas fa-star"></i>`;
  let emptyStar = `<i class="far fa-star"></i>`;


  return `
  <li><p>${item.title}</p><span class="stars">${fullStar.repeat(numOfStars)}${emptyStar.repeat(numEmpty)}
        <i class="fas fa-ellipsis-h"></i><i class="fas fa-trash-alt"></i><i class="fas fa-edit"></i></span>
        <span class="description">
        <p><a href="${item.url}" class="visit_button">Visit Site</a><i class="fas fa-star"></i>
        ${item.description}</p></span>`;
};

const generateBookmarksString = function (bookmarksList) {
  const items = bookmarksList.map((item) => generateItemElement(item));
  console.log(items);
  return items.join('');
};


const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const handleNewItemClicked = function () {};

const handleFilterClicked = function() {};

const handleBookmarkTitleClicked = function() {};

const handleDeleteBookmarkClicked = function() {};

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