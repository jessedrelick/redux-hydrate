import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'

class MatchCustom extends React.Component {

	componentWillMount() {
		if (!this.props.hydrationReducer.ready && this.props.resolve) {
			this.props.resolve.forEach((action) => {
				this.props.dispatch(action)
			})
		}
	}

	render() {
		return <Match {...this.props} />
	}
}

const mapState = (state, ownProps) => {
	const { hydrationReducer } = state
	const { resolve } = ownProps
	return {
		hydrationReducer,
		resolve
	}
}

const mapDispatch = (dispatch) => {
	return {
		dispatch
	}
}

export default connect(mapState, mapDispatch)(MatchCustom)