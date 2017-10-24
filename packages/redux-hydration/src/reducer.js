import { diff } from './util'

const init = {
  initialized: false,
  ready: false,
  timeout: false,
  register: {},
  log: [],
  unresolved: []
}

export default (state = init, action) => {
  switch(action.type) {
    case 'HYDRATE_REGISTER': {
        const
          register = Object.assign({}, state.register, {
            [action.initializer]: action.resolvers
          }),
          out = Object.assign({}, state, { register })
        return out
      }
      break
    case 'HYDRATE_START': {
        const unresolved = diff(state.register, state.log.slice())
        return Object.assign({}, state, { initialized: true, ready: unresolved.length < 1 })
      }
      break
    case 'HYDRATE_TIMEOUT': {
        const unresolved = diff(state.register, state.log.slice())
        return Object.assign({}, state, { timeout: true, unresolved })
      }
      break
    default: {
        if (state.ready) {
          return state
        }
        let
          logObject = {},
          log = state.log.slice()
        log.push(action.type)
        if (typeof window === 'undefined') {
          logObject = {
            log
          }
        }
        const unresolved = diff(state.register, log.slice())
        return Object.assign({}, state, {
          unresolved,
          ready: state.initialized === true && unresolved.length < 1
        }, logObject)
      }
      break
  }
}
