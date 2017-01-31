import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import root from 'window-or-global'

import Reducer from './reducer'
import Saga from './saga'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// createStore() is wrapped in a function so it can be executed on each server request
// Otherwise store state persists across multiple requests for lifetime of Node process
export default (init = {}) => {
  const store = createStore(
    Reducer,
    init,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(Saga)
  return store
}
