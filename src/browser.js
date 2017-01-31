export default (store) => {

  // start using client behavior
  store.dispatch({ type: 'HYDRATE_CLIENT' })
}
