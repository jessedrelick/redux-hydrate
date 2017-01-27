import React from 'react'
import Router from 'react-router/ServerRouter'
import Routes from './routes'

export default ({ location, context }) => (<Router location={location} context={context}>
	<Routes />
</Router>)