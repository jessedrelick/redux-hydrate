# Dependencies
- Redux

# Installation
```
npm i --save redux-hydration
```

# Configuration
**1. Wrap createStore() in a function call and apply middleware as usual.**
```javascript
export default (init = {}) {
  const store = createStore(
    Reducer,
    init,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(Saga)
  return store
}
```
This is necessary because we will want to create a new store on each server request, rather than keep one store persistent throughout lifetime of the server process.


**2. Add hydrate reducer to store**
```javascript
import { combineReducers } from 'redux'
import hydrationReducer from 'redux-hydration/reducer'

export default combineReducers({
  hydrationReducer,
  // ... your app's reducers
})
```

**3. Use the Hydration Helper on your web server.**
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script>window.__INITIAL_STATE__ = {{STATE}};</script>
</head>
<body>
  <div id="content">{{CONTENT}}</div>
	<script src="build/vendor.js"></script>
  <script src="build/app.js"></script>
</body>
</html>
```
```javascript
// server.js

// Load index.html template
let Document = fs.readFileSync(__dirname + '/index.html', 'utf8')
// Inject store state and React component into html template
const prepHTML = (jsx, store) => {
  const state = store.getState()
  Document = Document.replace('{{CONTENT}}', jsx)
  Document = Document.replace('{{STATE}}', JSON.stringify(state))
  return Document
}

// Set timeout so server will not hang during Hydration stage
const TIMEOUT = 2000

app.get('*', (req, res) => {
  let store = Store() // we want a new store for each request so state is not persisted between requests

  const jsx = (store, props) => (<Provider store={store}><App /></Provider>)
  // Optionally pass additional props to component
  const props = {}
  Helper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    const view = renderToString(jsx(store, props))
    const html = prepHTML(view, store)
    res.send(html)
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
})
```
The Helper returns a promise that will resolve when all 'resolvers' have been cleared. At this point, the server will render your application with the latest state available in your Redux store.

The prepHTML() function should add the view to the HTML page, and inject the Redux state into a window variable for use in the browser.

**4. Initialize Redux client-side with the server data.**
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app'
import Store from './store'

// Initialize browser store with server-side data in window.__INITIAL_STATE
const store = Store(window.__INITIAL_STATE)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('content')
)
```
This is the last piece of the configuration, and ensures that when the browser code loads, it already has the state that was retrieved on the server.

# Usage
There are 2 ways to use Redux-Hydration once your app is properly configured:

### Higher-Order Component (Recommended)
```javascript
import hydrationComponent from 'redux-hydration/component'
import MyComponent from './mycomponent'

const HydratedComponent = hydrationComponent(MyComponent, [
	{ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] },
	{ type: 'ASYNC_START' }
])
```
### Component Lifecycle
In your component's **componentWillMount()** lifecycle method, create an if statement to determine if state.hydrate.ready is not yet true (meaning hydration has not been completed yet).

Within this block, dispatch:
- 'HYDRATE_REGISTER' action types with a 'resolve' property to indicate acceptable action types to resolve
- Any actions necessary to initiate the processes that will trigger the action types needed to resolve

```javascript
componentWillMount() {
  if (!this.props.hydrate.ready) {
    this.props.dispatch({ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] })
    this.props.dispatch({ type: 'ASYNC_START' })
  }
}
```
This component is expecting an action to be dispatched with a type of either 'ASYNC_SUCCESS' or 'ASYNC_FAIL' before it is considered ready.

After these resolvers have been registered, 'ASYNC_START' will be dispatched, which will initiate the async process that is expected to eventually dispatch either 'ASYNC_SUCCESS' or 'ASYNC_FAIL'.
