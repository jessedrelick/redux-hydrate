Redux-Hydration is a small library that uses Redux to simplify the following:

- Redux server-side state hydration
- Dynamic/async components with React Router v4 (getComponent() is no longer available)

# The Problem
There are a handful of challenges involved with rendering components that need async data on the server. First off, React-Dom's renderToString() method is synchronous, meaning that any asynchronous actions will not finish executing before the final result is returned. This results in the server responding with 'empty' pages that give you the overall page structure, but do not contain dynamic data.

Although it will be covered more in the next section, there is a simple way to get around this using Redux. However, this solution also depends on the componentWillMount() lifecycle event in components, which is not necessarily a bad thing, but it's a bit of a shame to give up using stateless functional components just to add this one lifecycle event, especially when this is best left to a Higher Order Component.

A HOC can easily be used to abstract away this lifecycle method. However, a new problem arises when you use code-splitting, because the HOC now needs to execute when a route is hit AND be responsible for dynamically loading the component.

The result is Redux-Hydration, a combination of a Redux Reducer, a HOC for dynamically loading components, sagas and reducers, and defining what Redux actions are needed to resolve state prior to sending to the client.

# The Solution

# Dependencies
- Redux
- React Router 4 (for HOC/code-splitting)

# Installation

# Implementation
1. Wrap createStore() in function call, apply middleware as usual
```javascript
export default () {
  const store = createStore(
    Reducer,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(Saga)
  return store
}
```
2. Add hydrate reducer to store
3. In componentWillMount() or React-Router onEnter(), create an if statement to determine if state.hydrate.ready is not yet true, and within this if, dispatch 'HYDRATE_REGISTER' action types with a 'resolve' property to indicate acceptable action types to resolve. Also dispatch any actions necessary to initiate those initialization processes. Otherwise infinite loop will occur.

```javascript
if (!this.props.hydrate.ready) {
  this.props.dispatch({ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] })
  this.props.dispatch({ type: 'ASYNC_START' })
}
```
4. Wrap
5. Set Timeout to prevent pages from hanging, or use the optional server helper and specify a timeout limit

# Example
This repo contains an example that runs on http://localhost:3000. It demonstrates the following functionality:

1. Manually deferring rendering on the server until redux-hydration is ready
2. Using the provided server helper for deferring rendering on the server until redux-hydration is ready
3. Defining 'resolve' action types in componentWillMount() for a synchronous component
4. Using the provided HOC to dynamically import a component and resolve action types

Coming soon...
1. Dynamically importing and injecting sagas and reducers when a specific route is hit
