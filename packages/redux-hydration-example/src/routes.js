import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { hydrationHelper } from 'redux-hydration'

import Component from './components/sync'
import Store from './store'
import Server from './server'
let Document = fs.readFileSync(__dirname + '/../index.html', 'utf8')

const TIMEOUT = 6000

const prepHTML = (jsx, store) => {
  const state = store.getState()
  Document = Document.replace('{{CONTENT}}', jsx)
  Document = Document.replace('{}', JSON.stringify(state))
  return Document
}

export const ManualComponent = (req, res) => {
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

export const HelperComponent = (req, res) => {
  let store = Store()

  const jsx = (store, props) => (<Provider store={store}><Component /></Provider>)
  // Optionally pass additional props to component
  const props = {}
  hydrationHelper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    res.send(renderToString(jsx(store, props)))
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
}

export const HelperApp = (req, res) => {
  let store = Store()
  let context = {}

  const jsx = (store, props) => (
		<Provider store={store}>
			<Server location={req.url} context={context} />
		</Provider>
	)
  // Optionally pass additional props to component
  const props = {}
  hydrationHelper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    const JSX = renderToString(jsx(store, props))
    const HTML = prepHTML(JSX, store)
    res.send(HTML)
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
}