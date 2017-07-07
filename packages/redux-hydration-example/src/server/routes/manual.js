import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import Component from '../../components/sync'
import Store from '../../store'

export default (req, res) => {
  // New store must be created on each request, otherwise state will persist
  let store = Store()

  // When ready, re-render with updated store and send response
  const unsubscribe = store.subscribe(() => {
    if (store.getState().hydrationReducer.ready) {
      res.send(renderToString(<Provider store={store}><Component /></Provider>))
      unsubscribe()
    }
  })

  // Execute renderToString() to trigger route onEnter() or componentWillMount()
  // in order to register actions synchronously
  renderToString(<Provider store={store}><Component /></Provider>)

  // Because renderToString() is synchronous, all onEnter() or componentWillMount()
  // calls should have registered all async resolvers so we can initialize hydration process
  store.dispatch({ type: 'HYDRATE_START' })
}
