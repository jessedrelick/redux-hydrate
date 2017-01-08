import { combineReducers } from 'redux'
import hydrate from '../src/reducer'

const app = (state = { serverData: '' }, action) => {
  switch(action.type) {
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
  hydrate
})
