import React from 'react'
import Router from 'react-router/ServerRouter'
import Match from 'react-router/Match'
import { hydrationComponent } from '../index'

import Sync from './components/sync'
const Async = hydrationComponent({
	name: 'stateless',
	component: import('./components/async'),
	reducer: import('./components/async/reducer'),
	saga: import('./components/async/saga'),
	resolve: [
		['ASYNC_SUCCESS', 'ASYNC_FAIL'],
	],
	queue: [
		{ type: 'ASYNC_START' },
		{ type: 'BLOCK_CHECK' },
		{ type: 'ANOTHER_CHECK' }
	]
})

export default ({ location, context }) => (<Router location={location} context={context}>
	<div>
		<Match pattern='/sync' component={Sync} />
		<Match pattern='/async' component={Async} />
	</div>
</Router>)