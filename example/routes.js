import React from 'react'
import Router from 'react-router/ServerRouter'
import Match from 'react-router/Match'
import MatchCustom from './match'

import Component from './component'
import Stateless from './stateless'

export default ({ location, context }) => (<Router location={location} context={context}>
	<div>
		<Match pattern='/router' component={Component} />
		<MatchCustom pattern='/stateless' component={Stateless}
			resolve={[
				{ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] },
				{ type: 'ASYNC_START' }
			]}
		/>
	</div>
</Router>)