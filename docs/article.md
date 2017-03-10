After spending a solid 2 years using React and staying up-to-date with the community, there is one feature that continues to allude me. I've seen the benefits of Redux, Sagas, Reselect and React-Router, as well as Babel and Webpack, including code-splitting and CSS modules. However, there is one 'promise' of React, or should I say one-half of a promise of React, that I've yet to find a good answer for.

# Server-Side Rendering: Part 1 - Template rendering/Default data
About 95% of the articles I've read online regarding rendering React on the server have been focused on rendering the view. Initial state will be injected on something like window.__INITIAL_STATE__ which makes it easy for the browser to take over, and these same props get injected into the root component when calling renderToString() on the server. Easy peasy... Well except for one part, that is. There is no real explanation on where these 'magical' props come from. Yes, react-router match() provides renderProps for your application, but that is different from the application state that you would normally be building when hitting that route from the browser.

For the most part, this isn't a problem for the majority of the React community. Ultimately the majority of React apps can get away with this considering most aren't concerned with SEO, and at this point Google does a good job interpreting SPAs in this day and age if you do have content that needs to be indexed. However, if you want TRUE server-side rendering with React, and not rely on Google's Javascript engine, or maybe even considering the possibility of customers finding you through another search engine that does not yet handle JavaScript apps, then you will find that you need an effective way of rendering your page on the server with full application state .

# Server-Side Rendering: Part 2 - Async Application State/Hydration
If your main concern is just getting something in front of your customer quickly, instead of waiting for all of your application code to load and render on the browser, then there is no need to continue reading this article, and there are plenty of better articles for that from much smarter people. However, if your application is 'thirsty' and needs data on the server, then the rest of this article is for you.

### The problem
First off, let's start with the problem. Your React app, when running on the browser, has the luxury of doing all kinds of HTTP requests, and other async actions, to build up the application state you need to deliver to your user. You can fire off requests when a component mounts, when it will mount, when it's props change, when a user interacts with the application, or if you're using React Router when a route is hit.

When rendering on the server, using renderToString() from react-dom/server, this will not work because this is a synchronous operation. HTTP requests, web sockets and other async operations will not finish prior to the return of renderToString().

### The solution
The solution I have come up with, which is simple though may not work in all cases, uses Redux and either the componentWillMount() lifecycle event within components, or the onEnter() callback of React-Router. Technically it could work anywhere you can dispatch() to your Redux store, but the benefit of onEnter() or componentWillMount() is that it limits the scope of your application's bootstrap process, minimizing the amount of requests that need to resolve before sending the final render.

In onEnter(), or componentWillMount(), any action types that need to be resolved prior to rendering the application on the server are specified by dispatching an action containing the action type. Using Redux Middleware, all of these action types will bubble up from each route/component into a register, which will wait for a matching action to be dispatched from the store. For example:

```javascript
/** 'Thirsty' component **/
componentWillMount() {
	// ensure component has access to Redux' dispatch() in order to dispatch this action type
	this.props.dispatch({ type: 'HYDRATE_REGISTER', resolve: ['MY_ASYNC_ACTION_SUCCESS', 'MY_ASYNC_ACTION_FAIL']})
	this.props.dispatch({ type: ''MY_ASYNC_ACTION_BEGIN" })
}

/** ASYNC SAGA (THUNKS WOULD WORK AS WELL) **/
function* () {
	while (true) {
		// Saga is waiting for 'MY_ASYNC_ACTION_BEGIN' to be dispatched before moving on
		const action = yield take('MY_ASYNC_ACTION_BEGIN')
		try {
			// Once dispatched, this async call to the API begins. Normally this would not finish on the server before rendering is complete
			const response = yield call(myAPICall)
			yield put({ type: 'MY_ASYNC_ACTION_SUCCESS', response })
		} catch(err) {
			yield put({ type: 'MY_ASYNC_ACTION_FAIL', err })
		}		
	}
}

/** SERVER **/
// When all registered action types have been resolved, the hydrate property 'ready' will be set to true by the middleware and re-render with updated store and send response
store.subscribe(() => {
  if (store.getState().hydrate.ready) {
    res.send(render(<Provider store={store} />))
  }
})

// execute route onEnter() or componentWillMount() to register actions synchronously
render(<Provider store={store} />))

// because onEnter() / componentWillMount() are synchronous, register should be filled
store.dispatch({ type: 'HYDRATE_START' })
```

### Summary
Basically all this solution is doing is stating which action types are expected to be dispatched prior to rendering the page. When all action types have been dispatched, store.getState().hydrate.ready will change to ''true", and the final render can take place on the server and sent to the client. This solution should work with or without React Router, and should also work with Redux Thunks or Sagas. The solution has no dependencies, exports a small, simple Redux reducer and middleware, and also provides a server helper for simplifying the server code. A timeout limit can also be specified in the helper to prevent pages from hanging on the server and never resolving.

I'm not exactly an open-source expert, so any shortcomings or oversights of this solution are welcome. Hopefully, however, you find this to be a simple solution to a problem that seems to be overlooked in the React community, or at least lacks an easy convention to solve.
