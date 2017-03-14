import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Reducer from './reducer'
import Saga from './saga'

const sagaMiddleware = createSagaMiddleware()

// createStore() is wrapped in a function so it can be executed on each server request
// Otherwise store state persists across multiple requests for lifetime of Node process
export default (init = {}) => {
  const store = createStore(
    Reducer,
    init,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(Saga)
  return store
}
