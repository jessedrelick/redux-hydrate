export default (state = { register: [], components: {}, initialized: false, ready: false }, action) => {
  switch(action.type) {
    case 'HYDRATE_REGISTER': {
        let register = state.register.slice()
        let components = Object.assign({}, state.components)
        if (action.resolve) {
          register.push(action.resolve)
        } else if (action.name) {
          components[action.name] = false
        }

        return Object.assign({}, state, { register, components })
      }
      break
    case 'HYDRATE_START': {
        let components = Object.keys(state.components).filter((item) => {
          return state.components[item] === false
        })
        return Object.assign({}, state, { initialized: true, ready: state.register.length < 1 && components.length < 1 })
      }
      break
    case 'HYDRATE_COMPONENT': {
        let components = Object.assign({}, state.components)
        components[action.name] = action.component
        return Object.assign({}, state, { components })
      }
      break
    default: {
        if (state.ready) {
          return state
        }
        let register = state.register.filter((item) => {
          return item.indexOf(action.type) > -1 ? false : true
        })
        let components = Object.keys(state.components).filter((item) => {
          return state.components[item] === false
        })
        return Object.assign({}, state, {
          register,
          ready: state.initialized === true && register.length < 1 && components.length < 1
        })
      }
      break
  }
}