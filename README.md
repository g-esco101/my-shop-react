# My Shop React

A React app - an online shop that sells products. It is the result of completing the [Managing React State](https://app.pluralsight.com/library/courses/react-state-managing/table-of-contents) course on Pluralsight.

Managing React State concerns the following: deciding how and when to declare state; managing local and remote state; implementing routing; managing shared, derived, and immutable state; implementing form validation; managing state via refs; managing complex state with useReducer; sharing state and functions via context; managing state in class components; and managing state via third party libraries. It taught the skills to build complex, interactive React apps in the real world.

Note: There may be some components/code that appear to be unused. These are remnants from demos the instructor did to show various approaches to achieve a goal. I do have a private repo of this app that contains comprehensive notes within the files that I use for review. I use this version to share, because it is more readable.

## Technology

- Node.js version 12.8.3 (used by the instructor)
- React

## Getting Started

1. Install node 12.8.3 (I recommend using nvm - node version manager - to switch between versions of node)
2. Clone this repository

```
git clone https://github.com/g-esco101/my-shop-react.git
```

3. Change to root directory

```
cd my-shop-react
```

4. Install node packages with dependencies

```
npm install
```

5. Run the app

```
npm start
```

Go to http://localhost:3000/ to use the app.

## Starter Project Overview (from the instructor)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The instructor made the following enhancements:

1. Added a mock API using [json-server](https://github.com/typicode/json-server). Configured `npm start` to run the app and mock API at the same time using [npm-run-all](https://www.npmjs.com/package/npm-run-all). See [Building Applications with React and Flux](https://app.pluralsight.com/library/courses/react-flux-building-applications/table-of-contents) for details on how to set this up from scratch.
1. Installed [react-router-dom](https://www.npmjs.com/package/react-router-dom), [history](https://www.npmjs.com/package/history) (React Router peer dependency), and [cross-env](https://www.npmjs.com/search?q=cross-env) for declaring environment variables.
1. Added some React components to help us get started: Header, Footer, Spinner
1. Added styles to App.css
1. Added `/public/images`.
1. Added data fetching functions in `/src/services`.
1. Added db.json to root as json-server's mock database
1. Overwrote App.css with custom styles
1. Simplified index.js (removed service worker)
1. Deleted from src: index.css, logo.svg, serviceWorker.js, App.test.js
1. Deleted from public: logo files, manifest.json, robots.txt
1. Customized App.js and renamed to App.jsx
