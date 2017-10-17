import React from 'react'
import { Route, Link } from 'react-router-dom'
import { hydrationComponent } from 'redux-hydration'

import Sync from './components/sync'
import async from './components/async'

const Async = hydrationComponent([
	{ type: 'HYDRATE_REGISTER', initializer: 'ASYNC_START', resolvers: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] }
])(async)

export default () => (
	<div>
		<Link to="/sync">Sync</Link>
		<Link to="/async">Async</Link>
		<Route path='/sync' component={Sync} />
		<Route path='/async' component={Async} />
	</div>
)
