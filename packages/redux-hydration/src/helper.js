export default (store, props, render, jsx, timeout) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().hydrationReducer.ready) {
        resolve()
        unsubscribe()
        clearTimeout(to)
      }
    })
    render(jsx(store, props))
    store.dispatch({ type: 'HYDRATE_START' })
    const to = setTimeout(() => {
      store.dispatch({ type: 'HYDRATE_TIMEOUT' })
      unsubscribe()
      resolve(true)
    }, timeout)
  })
}
