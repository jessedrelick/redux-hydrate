import root from 'window-or-global'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '../app'
import Store from '../store'

const store = Store(root.__INITIAL_STATE__)

const render = (Routes) => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Provider>,
		document.getElementById('content')
	)
}

render(App)

if (module.hot) {
  module.hot.accept(() => {
		render(App)
	})
}
