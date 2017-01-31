import React from 'react'
import { Match } from 'react-router'
import { Link } from 'react-router'
import { hydrationComponent } from '../index'

import Sync from './components/sync'
const Async = hydrationComponent({
	name: 'stateless',
	component: System.import('./components/async'),
	reducer: System.import('./components/async/reducer'),
	saga: System.import('./components/async/saga'),
	resolve: [
		['ASYNC_SUCCESS', 'ASYNC_FAIL'],
	],
	queue: [
		{ type: 'ASYNC_START' },
		{ type: 'BLOCK_CHECK' },
		{ type: 'ANOTHER_CHECK' }
	]
})

export default () => (
	<div>
		<Link to="/sync">Sync</Link><br />
		<Link to="/async">Async</Link>
		<Match pattern='/sync' component={Sync} />
		<Match pattern='/async' component={Async} />
	</div>
)