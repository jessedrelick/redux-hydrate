import React from 'react'
import { connect } from 'react-redux'

export default function(Component, resolve, name) {
	class Hydrate extends React.Component {

		componentWillMount() {
			if (!this.props.hydrationReducer.ready && resolve) {
				resolve.forEach((action) => {
					this.props.dispatch(action)
				})
			}
			if (Component.then && name) {
				this.props.dispatch({ type: 'HYDRATE_REGISTER', name })
				Component.then((mod) => {
					this.props.dispatch({ type: 'HYDRATE_COMPONENT', name, component: mod.default })
				})
			}
		}

		render() {
			if (!Component.then) {
				return <Component {...this.props} />
			}
			const { hydrationReducer } = this.props
			const Async = hydrationReducer.components[name]
			if (Async) {
				return <Async {...this.props} />
			}
			return false
		}
	}

	const mapState = (state, ownProps) => {
		const { hydrationReducer } = state
		return {
			hydrationReducer
		}
	}

	const mapDispatch = (dispatch) => {
		return {
			dispatch
		}
	}

	return connect(mapState, mapDispatch)(Hydrate)
}