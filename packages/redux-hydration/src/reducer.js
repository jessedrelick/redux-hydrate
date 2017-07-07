export default (state = { initialized: false, ready: false, timeout: false, register: [] }, action) => {
  switch(action.type) {
    case 'HYDRATE_REGISTER': {
        let register = state.register.slice()
        register.push(action.resolve)
        return Object.assign({}, state, { register })
      }
      break
    case 'HYDRATE_START': {
        return Object.assign({}, state, { initialized: true, ready: state.register.length < 1 })
      }
      break
    case 'HYDRATE_TIMEOUT': {
        return Object.assign({}, state, { timeout: true })
      }
      break
    default: {
        if (state.ready) {
          return state
        }
        let register = state.register.filter((item) => {
          return item.indexOf(action.type) > -1 ? false : true
        })
        return Object.assign({}, state, {
          register,
          ready: state.initialized === true && register.length < 1
        })
      }
      break
  }
}