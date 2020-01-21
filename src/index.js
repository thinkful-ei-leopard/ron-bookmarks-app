
import bookmarksApp from '../bookmarksApp.js';
import api from './api.js';
import store from './store.js';

// $(document).ready(function(){
//   // Check Radio-box
//   $('.rating input:radio').attr('checked', false);

//   $('.rating input').click(function () {
//     $('.rating span').removeClass('checked');
//     $(this).parent().addClass('checked');
//   });

//   $('input:radio').change(
//     function(){
//       var userRating = this.value;
//       alert(userRating);
//     }); 
// });

// api.getBookmarks()
//   .then(resp => resp.json)
//   .then(items =>
//     console.log(items))
//   .catch((error) => {
//     console.log(error);
//     //store.setError(error.message);
//     //renderError();
//   });


// let newBookmarkName = 'google';
// let newUrlName = 'https://www.google.com';
// let newDescription = 'search entginee';
// let newRating = 5;

// const newBookmarkEntry = {
//   title: newBookmarkName,
//   url: newUrlName,
//   desc: newDescription,
//   rating: newRating
// };

// api.createBookmark(newBookmarkEntry)
//   .then(resp => console.log(resp))
//   .catch((error) => {
//     console.log(`This is the error: ${error.message}`);
//     store.setError(error.message);
//     bookmarksApp.renderError();
//   });


const main = function() {
  console.log('main function running');
  bookmarksApp.bindEventListeners();
  bookmarksApp.render();

  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarksApp.render();
    });
};

$(main);