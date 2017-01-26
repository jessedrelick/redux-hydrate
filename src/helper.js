export default (store, props, render, jsx, timeout) => {
  return new Promise((resolve, reject) => {

    // Flag to prevent stack overflow for queue.forEach()
    let resolving = false

    const unsubscribe = store.subscribe(() => {
      const state = store.getState().hydrationReducer

      // Update Reducers
      if (state.reducers.loaded && !state.reducers.ready) {
        //store.replaceReducer(reducer, state.getState())
        store.dispatch({ type: 'HYDRATE_REDUCER_READY' })
      }

      // When both Reducers and Sagas are ready
      if (state.reducers.ready && state.sagas.ready) {

        // Dispatch actions queue
        if (!resolving) {
          resolving = true
          const { queue } = state.resolvers
          queue.forEach((action) => {
            store.dispatch(action)
          })
          resolving = false

        // Hydration complete (dynamic reducers injected, dynamic sagas running,
        // dynamic components loaded, all resolvers resolved)
        } else if (state.resolvers.resolvers.length < 1) {

          // Stop listening to store
          unsubscribe()

          // Set hydrationReducer.ready to true
          store.dispatch({ type: 'HYDRATE_COMPLETE' })

          // Resolve promise
          resolve()
        }
      }
    })

    // initial render to collect hydration requirements
    render(jsx(store, props))

    // start hydration sequence
    store.dispatch({ type: 'HYDRATE_START' })

    // limit processing time to prevent server hang
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
