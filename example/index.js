import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createServerRenderContext from 'react-router/createServerRenderContext'
import Helper from '../src/helper'

import Component from './component'
import Store from './store'
import Routes from './routes'

const app = express()

const PORT = 3000
const TIMEOUT = 6000

app.get('/manual', (req, res) => {
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
})

app.get('/helper', (req, res) => {
  let store = Store()

  const jsx = (store, props) => (<Provider store={store}><Component /></Provider>)
  // Optionally pass additional props to component
  const props = {}
  Helper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    res.send(renderToString(jsx(store, props)))
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
})

app.get('*', (req, res) => {
  let store = Store()
  let context = createServerRenderContext()

  const jsx = (store, props) => (<Provider store={store}><Routes location={req.url} context={context} /></Provider>)
  // Optionally pass additional props to component
  const props = {}
  Helper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    res.send(renderToString(jsx(store, props)))
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
})

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Server running at http://localhost:${PORT}`)
  }
})
