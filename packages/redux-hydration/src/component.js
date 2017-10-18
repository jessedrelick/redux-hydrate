import React from 'react'
import { connect } from 'react-redux'

const
	TYPE_REGISTER = 'HYDRATE_REGISTER'

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
			if (hydrationReducer.ready) {
				return
			}

			if (hydrationReducer.timeout) {
				const { unresolved } = hydrationReducer
				unresolved.forEach(k => {
					dispatch({ type: k })
				})
			} else if (actions) {
				actions.forEach((action) => {
					if (action.type === TYPE_REGISTER && action.initializer) {
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
