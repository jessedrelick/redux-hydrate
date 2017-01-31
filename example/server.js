import React from 'react'
import { ServerRouter } from 'react-router'
import Routes from './routes'

export default ({ location, context }) => (<ServerRouter location={location} context={context}>
	<Routes />
</ServerRouter>)