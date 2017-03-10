# Redux-Hydration
Redux-Hydration is a small library that uses Redux to simplify server-side state **hydration**

#### Hydration vs Server-Side Rendering
Server-side rendering is a popular feature used to sell React to the front-end community. In practice, however, server-side rendering can be a misleading term. In fact, there are actually 2 stages to server-side rendering:

1. **Rendering** - Think of stage 1 as the 'empty' shell of the page without dynamic data. It is useful for the PERCEIVED load time of the page to the end user, because they at least see the page structure returned from the server. This is a better experience than waiting for all the client-side code to load and render before the user sees anything.

2. **Hydration** - Rendering an empty page on the page is pretty simple with React, and is well-documented. 'Hydrating' that state with actual dynamic data ON THE SERVER is more complicated, and is the concern of this library.

# Contents
- [Setup & Installation](/docs/setup.md)
- [Problem & Solution](/docs/problem.md)
- [Example](/docs/example.md)
- [API](/docs/api.md)
- [Article about Hydration](/docs/article.md)