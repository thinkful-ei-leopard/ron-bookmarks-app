// For local data in STORE
const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: 0
};

const setError = function(error) {
  this.error = error;
};

const addItem = function (item) {
  // stores the value of the Bookmark object in store
  // and adds the expanded property to it (set to false by default)
  this.store.bookmarks.push(item);
  item.expanded = false;
};

const findAndUpdate = function(id, newData){
  const target = this.findById(id); 
  console.log(`target ${target}`);
  Object.assign(target, newData);
};

const findById = function (id) {
  return this.store.bookmarks.find(currentItem => currentItem.id === id);
};

const addHTML = function(stringOne, stringTwo) {
  const newString = stringOne.concat(stringTwo);
  return newString;
};

const findAndDelete = function (id) {
  this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id);
  // change this.items to this.store.bookmarks?
};

export default {
  store,
  setError,
  addItem,
  findAndUpdate,
  findById,
  findAndDelete,
  addHTML
};