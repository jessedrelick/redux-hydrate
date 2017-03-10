# The Problem
There are a handful of challenges involved with rendering components that need async data on the server. First off, React-Dom's renderToString() method is synchronous, meaning that any asynchronous actions will not finish executing before the final result is returned. This results in the server responding with 'empty' pages that give you the overall page structure, but do not contain dynamic data.

Although it will be covered more in the next section, there is a simple way to get around this using Redux. However, this solution also depends on the componentWillMount() lifecycle event in components, which is not necessarily a bad thing, but it's a bit of a shame to give up using stateless functional components just to add this one lifecycle event, especially when this is best left to a Higher Order Component.

A HOC can easily be used to abstract away this lifecycle method. However, a new problem arises when you use code-splitting, because the HOC now needs to execute when a route is hit AND be responsible for dynamically loading the component.

The result is Redux-Hydration, a combination of a Redux Reducer, a HOC for dynamically loading components, and a declarative way to define what Redux actions are needed to resolve state prior to sending to the finally rendered view to the client.

# The Goal
- As close to 'Universal' as possible i.e. fetching data is handled the same on the server as it is on the client, minimizing the need for 2 different initialization processes
- Simple & Declarative

# The Solution
The solution to this problem within Redux-Hydration is to use a Helper that will resolve a
promise when all of the following conditions are met:
```
app.get('*', (req, res) => {
  let store = Store()

  const jsx = (store, props) => (<Provider store={store}><Component /></Provider>)
  // Optionally pass additional props to component
  const props = {}
  // This helper will resolve when all expected action types have been dispatched to the store,
  // indicating that the current view has been built as expected
  Helper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    const JSX = renderToString(jsx(store, props))
    const HTML = prepHTML(JSX, store)
    res.send(HTML)
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
})
```

