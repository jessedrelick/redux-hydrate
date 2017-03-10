# Modules
```javascript
import hydrationComponent from 'redux-hydration/component'
import hydrationHelper from 'redux-hydration/helper'
import hydrationReducer from 'redux-hydration/reducer'
```

# Component
Higher-Order component used to register **resolvers** and dispatch **initializers**

### hydrationComponent(component, actions)
**component** - This is the React component you'd like to wrap with the hydrationComponent HOC
**actions** - An array of actions to dispatch when hydrating the component

**Returns** - React component

The Redux-Hydration reducer looks for a special action type named 'HYDRATE_REGISTER', and expects a property 'resolve', which is an array of action types considered acceptable for marking the component ready:

**EXAMPLE**
```javascript
hydrationComponent(MyComponent, [
	{type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL']},
	{type: 'ASYNC_START'}
])
```
In this example, whenever 'ASYNC_SUCCESS' OR 'ASYNC_FAIL' is dispatched, 'MyComponent' is considered ready.

'ASYNC_START' could be any action type that triggers an async process that should eventually resolve with an 'ASYNC_SUCCESS' or 'ASYNC_FAIL' action type.

Using Redux-Saga:
```javascript
function* async() {
  while (true) {
    yield take('ASYNC_START')
    yield delay(2000)
    const data = 'I am an async component'
    yield put({ type: 'ASYNC_SUCCESS', data })
  }
}
```

# Helper
Helper function

### hydrationHelper(store, props, renderToString, jsx, timeout)
**store** -
**props** -
**renderToString** -
**jsx** -
**timeout** -

**Returns** - Promise

**EXAMPLE**
```javascript
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

# Reducer
**HYDRATE_REGISTER**
**HYDRATE_START**

