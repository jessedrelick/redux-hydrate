import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import Helper from '../src/browser'

import Routes from './routes'
import Store from './store'

const store = Store(window.__INITIAL_STATE__)
Helper(store)

render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.getElementById('content')
)
