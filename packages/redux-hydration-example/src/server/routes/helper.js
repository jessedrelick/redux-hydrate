import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { hydrationHelper } from 'redux-hydration'

import Store from '../../store'
import Router from '../router'
import Util from '../util'

const TIMEOUT = 6000

export default (req, res) => {
  let store = Store()
  let context = {}

  const jsx = (store, props) => (
		<Provider store={store}>
			<Router location={req.url} context={context} />
		</Provider>
	)
  // Optionally pass additional props to component
  const props = {}
  hydrationHelper(store, props, renderToString, jsx, TIMEOUT)
  .then(() => {
    const JSX = renderToString(jsx(store, props))
    const HTML = Util.prepHTML(JSX, store)
    res.send(HTML)
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
}
