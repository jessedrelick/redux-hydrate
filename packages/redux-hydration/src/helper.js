export default (store, props, render, jsx, timeout) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().hydrationReducer.ready) {
        resolve()
        unsubscribe()
      }
    })
    render(jsx(store, props))
    store.dispatch({ type: 'HYDRATE_START' })
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })
}
