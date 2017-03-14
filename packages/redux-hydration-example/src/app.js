import React from 'react'
import { Route } from 'react-router-dom'
import { hydrationComponent } from 'redux-hydration'

import Sync from './components/sync'
const Async = hydrationComponent(import('./components/async'), [
	{ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] },
	{ type: 'ASYNC_START' }
], 'stateless')

export default () => (
	<div>
		<Route path='/sync' component={Sync} />
		<Route path='/async' component={Async} />
	</div>
)