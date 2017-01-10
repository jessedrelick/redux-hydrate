import React from 'react'
import Router from 'react-router/ServerRouter'
import Match from 'react-router/Match'
import Component from './component'

export default ({ location, context }) => (<Router location={location} context={context}>
	<Match pattern='/router' component={Component} />
</Router>)