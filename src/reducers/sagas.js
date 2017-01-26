import { Loaded } from '../util'

const init = {
  loaded: false,
  ready: false,
  sagas: {}
}

export default (state = init, action) => {
  let sagas = Object.assign({}, state.sagas)

  switch(action.type) {
    case 'HYDRATE_SAGA_IMPORT':
      sagas[action.name] = false
      return Object.assign({}, state, { sagas })
      break
    case 'HYDRATE_SAGA_LOADED':
      sagas[action.name] = action.saga
      let loaded = Loaded(sagas)
      return Object.assign({}, state, { loaded, sagas })
      break
    case 'HYDRATE_SAGA_READY':
      return Object.assign({}, state, { ready: true })
      break
    default:
      return state
      break
  }
}