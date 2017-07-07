import React from 'react'
import { connect } from 'react-redux'

export default (resolvers) => (Component) => {

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
			if (!hydrationReducer.ready && resolvers) {
				resolvers.forEach((action) => {
					dispatch(action)
				})
			}
		}

		render() {
			return <Component {...this.props} />
		}
	}

	return connect(mapState)(Hydrate)
}



