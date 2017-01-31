import { Loaded } from '../util'

const init = {
  loaded: false,
  ready: false,
  components: {}
}

export default (state = init, action) => {
  let components = Object.assign({}, state.components)

  switch(action.type) {
    case 'HYDRATE_COMPONENT_IMPORT':
      components[action.name] = false
      return Object.assign({}, state, { components })
      break
    case 'HYDRATE_COMPONENT_LOADED':
      components[action.name] = action.component
      let loaded = Loaded(components)
      return Object.assign({}, state, { loaded, components })
      break
    case 'HYDRATE_COMPONENT_READY':
      return Object.assign({}, state, { ready: true })
      break
    case 'HYDRATE_CLIENT':
      return state
      break
    default:
      return state
      break
  }
}