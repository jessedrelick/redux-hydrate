import { Loaded } from '../util'

const init = {
  loaded: false,
  ready: false,
  reducers: {}
}

export default (state = init, action) => {
  let reducers = Object.assign({}, state.reducers)

  switch(action.type) {
    case 'HYDRATE_REDUCER_IMPORT':
      reducers[action.name] = false
      return Object.assign({}, state, { reducers })
      break
    case 'HYDRATE_REDUCER_LOADED':
      reducers[action.name] = action.reducer
      let loaded = Loaded(reducers)
      return Object.assign({}, state, { loaded, reducers })
      break
    case 'HYDRATE_REDUCER_READY':
      return Object.assign({}, state, { ready: true })
      break
    default:
      return state
      break
  }
}