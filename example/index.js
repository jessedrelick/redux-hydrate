import React from 'react'
import fs from 'fs'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import createServerRenderContext from 'react-router/createServerRenderContext'
import Helper from '../src/helper'

import Component from './components/sync'
import Store from './store'
import Routes from './server'
let Document = fs.readFileSync(__dirname + '/index.html', 'utf8')

const prepHTML = (jsx, store) => {
  const state = store.getState()
  Document = Document.replace('{{CONTENT}}', jsx)
  Document = Document.replace('{{STATE}}', JSON.stringify(state))
  return Document
}

const app = express()

const PORT = 3000
const TIMEOUT = 6000

app.use('/build', express.static(`${__dirname}/../build`))

app.get('/manual', (req, res) => {
  // New store must be created on each request, otherwise state will persist
  let store = Store()

  // When ready, re-render with updated store and send response
  const unsubscribe = store.subscribe(() => {
    if (store.getState().hydrationReducer.ready) {
      const JSX = renderToString(<Provider store={store}><Component /></Provider>)
      const HTML = prepHTML(JSX, store)
      res.send(HTML)
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
    const JSX = renderToString(jsx(store, props))
    const HTML = prepHTML(JSX, store)
    res.send(HTML)
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
    const JSX = renderToString(jsx(store, props))
    const HTML = prepHTML(JSX, store)
    res.send(HTML)
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
