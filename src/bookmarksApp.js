// Render and Event Listeners
import store from './store.js';

const render = function() {
  renderError();
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