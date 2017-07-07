import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { hydrationHelper } from 'redux-hydration'

import Component from '../../components/sync'
import Store from '../../store'

const TIMEOUT = 6000

export default (req, res) => {
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