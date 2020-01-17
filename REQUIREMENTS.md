# Bookmarks App Requirements and User Stories
## For successful submission, you MUST:

1. Push your final version to the ```gh-pages``` branch of your repo. Your repo should be inside the cohort's organization and named ```yourname-bookmarks-app```.
2. Add the live GH Pages link to the header of your repo.
3. Submit the repo URL at the bottom of this page.

## User Stories
### As a user:
* I can add bookmarks to my bookmark list. Bookmarks contain:
    * title
    * url link
    * description
    * rating (1-5) 
* I can see a list of my bookmarks when I first open the app
    * All bookmarks in the list default to a "condensed" view showing only title and rating
* I can click on a bookmark to display the "detailed" view
    * Detailed view expands to additionally display description and a "Visit Site" link
* I can remove a bookmark from my bookmark list
* I receive appropriate feedback when I cannot submit a bookmark
    * Check all validations in the API documentation (e.g.```title``` and```url``` field required)
* I can select from a ```dropdown``` (a ```<select>``` element) a "minimum rating" to filter list by all bookmarks
    rated at or above the chosen selection
* (Extension feature - optional) I can edit the rating and description of a bookmark in my list

## Technical Requirements
* Use ```fetch``` for AJAX calls and jQuery for DOM manipulation
* Use namespacing to adhere to good architecture practices
    * Minimal global variables
    * Create modules in separate files to organize your code
    * Logically group your functions (e.g. API methods, store methods...)
* Keep your Data out of the DOM
    * No direct DOM manipulation in your event handlers!
    * Follow the React-ful design pattern - change your state, re-render your component
* Use semantic HTML
* Use a [responsive and mobile-first design](https://courses.thinkful.com/html-css-v1/checkpoint/13)
    * Visually and functionally solid in viewports for mobile and desktop
* Follow a11y best practices
    * Refer back to the lessons on [accessibility](https://courses.thinkful.com/html-css-v1/checkpoint/7), [forms](https://courses.thinkful.com/html-css-v1/checkpoint/9)