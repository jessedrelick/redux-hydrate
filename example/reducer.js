import { combineReducers } from 'redux'
import hydrationReducer from '../src/reducer'

const init = {
  syncData: '',
  asyncData: ''
}

const app = (state = init, action) => {
  switch(action.type) {
    case 'SYNC_SUCCESS':
      return Object.assign({}, state, { syncData: action.data })
      break
    case 'ASYNC_SUCCESS':
      return Object.assign({}, state, { asyncData: action.data })
      break
    default:
      return state
      break
  }
}

export default combineReducers({
  app,
  hydrationReducer
})
