import React from 'react'
import Router from 'react-router/ServerRouter'
import Match from 'react-router/Match'
import { hydrationComponent } from '../index'

import Sync from './components/sync'
const Async = hydrationComponent(import('./components/async'), [
	{ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] },
	{ type: 'ASYNC_START' }
], 'stateless')

export default ({ location, context }) => (<Router location={location} context={context}>
	<div>
		<Match pattern='/sync' component={Sync} />
		<Match pattern='/async' component={Async} />
	</div>
</Router>)