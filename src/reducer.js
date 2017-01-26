import { combineReducers } from 'redux'

import components from './reducers/components'
import reducers from './reducers/reducers'
import resolvers from './reducers/resolvers'
import sagas from './reducers/sagas'

const init = {
  initialized: false,
  ready: false
}

const hydration = (state = init, action) => {

  switch(action.type) {
    case 'HYDRATE_START':
      return Object.assign({}, state, { initialized: true })
      break
    case 'HYDRATE_COMPLETE':
      return Object.assign({}, state, { ready: true })
      break
    default:
        return state
      break
  }
}

export default combineReducers({
  hydration,
  components,
  reducers,
  resolvers,
  sagas
})