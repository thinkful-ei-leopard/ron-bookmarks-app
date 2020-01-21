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
        
        <p>Error!  The following error has occurred: ${message}</p>
        <button id='cancel-error'>Okay :-(</button>
    `;
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
};

export default {
  render,
  bindEventListeners
};