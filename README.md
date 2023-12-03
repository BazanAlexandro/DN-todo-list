# Todo list

Demo:
https://dn-todo-list.vercel.app/

Project was created using [create-vue boilerplate package](https://www.npmjs.com/package/create-vue) with Typescript and Tailwind.
Also, doing query fetching with [@tanstack/vue-query](https://www.npmjs.com/package/@tanstack/vue-query).

commands:

- ```npm run``` - to run project locally
- ```npm run test:unit``` - run unit tests
- ```npm run build``` - run build

What was implemented:
- CRUD for list items
- Global error handling
- State persistance with localstorage
- Filtering by todo message and completed status

Any modifications to the state are made to local data. If you want to fetch `fresh` items from api again, type `localStorage.clear()` in the console.

Error handling is implemented in `vue-query` plugin configuration, which shows user friendly error message in a toast and logs actual message to the console.

Because [dummy api](https://dummyjson.com/docs/todos) does not save any data on their end, there a couple of bugs you should be aware of.

- if you try to update or delete a newly created item, you'll get an error (because a freshly allocated id is not present on the backend's database and any operations with it are invalid)
- if you try to complete an item after it's text was changed, item's text will be reset (because I'm using backend response in order to update local state, and previous update is not being persisted there). With working backend this bug would not occur.

Also, there are 13 tests written for both components and functions.
I would like to test vue-query functionality as well, but stuck there, because this functionality relies on some provider/inject functionality.

What I would like to add:
- Animations
- Probably debounce on inputs
- I see api splits todos by user, probably would need to add some kind of user filter or so

Let me know please what you think of the app.