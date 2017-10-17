import React from 'react'
import { connect } from 'react-redux'

export default (actions) => (Component) => {

	const
		mapState = (state) => {
			const { hydrationReducer } = state
			return {
				hydrationReducer
			}
		}

	class Hydrate extends React.Component {

		componentWillMount() {
			const { dispatch, hydrationReducer } = this.props
			if (!hydrationReducer.ready && actions) {
				actions.forEach((action) => {
					if (action.type === 'HYDRATE_REGISTER' && action.initializer) {
						dispatch(action)
						dispatch({ type: action.initializer })
					}
				})
			}
		}

		render() {
			return <Component {...this.props} />
		}
	}

	return connect(mapState)(Hydrate)
}
