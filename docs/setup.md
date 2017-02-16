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