# Example
This repo contains an example that runs on http://localhost:3000. It demonstrates the following functionality:

1. Manually deferring rendering on the server until redux-hydration is ready
2. Using the provided server helper for deferring rendering on the server until redux-hydration is ready
3. Defining 'resolve' action types in componentWillMount() for a synchronous component
4. Using the provided HOC to dynamically import a component and resolve action types

Coming soon...
1. Dynamically importing and injecting sagas and reducers when a specific route is hit