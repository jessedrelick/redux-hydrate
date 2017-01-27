import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import BrowserRouter from 'react-router/BrowserRouter'

import Routes from './routes'
import Store from './store'

const store = Store()

render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.getElementById('content')
)
