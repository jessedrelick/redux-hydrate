const init = {
  resolvers: [],
  queue: []
}

export default (state = init, action) => {
  let resolvers = state.resolvers.slice()
  let queue = state.queue.slice()

  switch(action.type) {
    case 'HYDRATE_RESOLVE_REGISTER':
      resolvers.push(action.resolve)
      return Object.assign({}, state, { resolvers })
      break
    case 'HYDRATE_QUEUE_REGISTER':
      queue.push(action.action)
      return Object.assign({}, state, { queue })
      break
    default: {
        if (state.resolvers.length < 1) {
          return state
        }
        resolvers = resolvers.filter((item) => {
          return item.indexOf(action.type) > -1 ? false : true
        })
        return Object.assign({}, state, { resolvers })
      }
      break
  }
}