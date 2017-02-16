# Redux-Hydration
Redux-Hydration is a small library that uses Redux to simplify the following:

- Redux server-side state **hydration**
- Dynamic/async components with React Router v4 (getComponent() is no longer available in v4)

#### Hydration vs Server-Side Rendering
One of the many virtues of React touted in the community is it's to do server-side rendering. In practice, however, this can be a misleading term. In fact, there are really 2 stages to server-side rendering:

1. Rendering - Think of stage 1 as the 'empty' shell of the page without dynamic data. It is useful for the PERCEIVED load time of the page to the end user, because they see the page structure returned from the server instead of waiting for the client-side code to load and render before they see anything. Valuable, but a bit misleading when you consider stage 2 'hydration'.
2. Hydration - Rendering an empty page on the page is pretty simple with React, and is well-documented. 'Hydrating' that state with actual dynamic data ON THE SERVER is more complicated, and is the concern of this library.

# Contents
- [/docs/setup.md](Setup & Installation)
- [/docs/problem.md](Problem & Solution)
- [/docs/api.md](API)