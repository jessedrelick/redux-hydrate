import React from 'react'
import { connect } from 'react-redux'

export default function({ name, component, reducer, saga, resolve, queue }) {
	class Hydrate extends React.Component {

		componentWillMount() {
			if (!this.props.hydrationReducer.ready && resolve) {
				resolve.forEach((types) => {
					this.props.dispatch({ type: 'HYDRATE_RESOLVE_REGISTER', resolve: types })
				})
			}
			if (queue) {
				queue.forEach((action) => {
					this.props.dispatch({ type: 'HYDRATE_QUEUE_REGISTER', action })
				})
			}
			if (component.then && name) {
				this.props.dispatch({ type: 'HYDRATE_COMPONENT_IMPORT', name })
				component.then((mod) => {
					this.props.dispatch({ type: 'HYDRATE_COMPONENT_LOADED', name, component: mod.default })
				})
				.catch((err) => {
					console.error(err)
				})
			}
			if (reducer && reducer.then && name) {
				this.props.dispatch({ type: 'HYDRATE_REDUCER_IMPORT', name })
				reducer.then((mod) => {
					this.props.dispatch({ type: 'HYDRATE_REDUCER_LOADED', name, reducer: mod.default })
				})
				.catch((err) => {
					console.error(err)
				})
			}
			if (saga && saga.then && name) {
				this.props.dispatch({ type: 'HYDRATE_SAGA_IMPORT', name })
				saga.then((mod) => {
					this.props.dispatch({ type: 'HYDRATE_SAGA_LOADED', name, saga: mod.default })
				})
				.catch((err) => {
					console.error(err)
				})
			}
		}

		render() {
			if (!component.then) {
				return <component {...this.props} />
			}
			const { components } = this.props.hydrationReducer.components
			const Async = components[name]
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