import bookmarksApp from './bookmarksApp.js';
import api from './api.js';
import store from './store.js';


const main = function() {

  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarksApp.render();
    })
    .catch((error) => {
      console.log('Error line 63 in Index.js');
      store.setError(error.message);
      bookmarksApp.renderError();
    });

  bookmarksApp.bindEventListeners();
};

$(main);