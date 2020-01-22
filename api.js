/* For API calls */

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Ron';

function listApiFetch(...args) {
  let error = null;
  return fetch(...args)
    .then(resp => {
      if(!resp.ok) { //Valid HTTP response, but non-2XX status
        error = {code: resp.status};
      }
      return resp.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}
function getBookmarks() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

// Expects an OBJECT Should be passed through as {title: Yahoo, url: http://yahoo.com, desc: blah blah, rating: 2}
// desc and rating are optional
function createBookmark(bookmarkObj) {
  const newItem = JSON.stringify(bookmarkObj);
  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });
}
/*
    @params updateData will be an OBJECT 
    the object should be passed as {property : value} */
function updateBookmark(id, updateData) {
  const newData = JSON.stringify( updateData );
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
}

function deleteBookmark (id) {
  return listApiFetch(BASE_URL + '/bookmarks/' + id, {
    method: 'DELETE'
  });
}

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};
