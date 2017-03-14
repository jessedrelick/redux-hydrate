import { combineReducers } from 'redux'
import { hydrationReducer } from 'redux-hydration'

const app = (state = { serverData: '' }, action) => {
  switch(action.type) {
    case 'SYNC_SUCCESS':
      return Object.assign({}, state, { serverData: action.data })
      break
    case 'ASYNC_SUCCESS':
      return Object.assign({}, state, { serverData: action.data })
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
