const init = {
  initialized: false,
  ready: false,
  timeout: false,
  register: [],
  log: [],
  unresolved: []
}

const diff = (register, log) => (
  register.filter(resolvers => !log.some(action => resolvers.indexOf(action) >= 0))
)

export default (state = init, action) => {
  switch(action.type) {
    case 'HYDRATE_REGISTER': {
        let register = state.register.slice()
        register.push(action.resolve)
        return Object.assign({}, state, { register })
      }
      break
    case 'HYDRATE_START': {
        const unresolved = diff(state.register.slice(), state.log.slice())
        return Object.assign({}, state, { initialized: true, ready: unresolved.length < 1 })
      }
      break
    case 'HYDRATE_TIMEOUT': {
        const unresolved = diff(state.register.slice(), state.log.slice())
        return Object.assign({}, state, { timeout: true, unresolved })
      }
      break
    default: {
        if (state.ready) {
          return state
        }
        let log = state.log.slice()
        log.push(action.type)
        const unresolved = diff(state.register.slice(), log.slice())
        return Object.assign({}, state, {
          log,
          ready: state.initialized === true && unresolved.length < 1
        })
      }
      break
  }
}
