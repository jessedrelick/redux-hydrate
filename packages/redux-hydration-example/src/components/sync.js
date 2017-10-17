import React from 'react'
import { connect } from 'react-redux'

class Sync extends React.Component {

  componentWillMount() {
    // If these are executed even after state is hydrated it will result in infinite loop
    if (!this.props.hydrationReducer.ready) {
      this.props.dispatch({ type: 'HYDRATE_REGISTER', initializer: 'SYNC_START', resolvers: ['SYNC_SUCCESS', 'SYNC_FAIL'] })
    }
  }

  render() {
    const { serverData } = this.props

    return (
      <div>
        <div>{serverData}</div>
      </div>
    )
  }
}

const mapState = (state) => ({ hydrationReducer: state.hydrationReducer, serverData: state.app.serverData })

export default connect(mapState)(Sync)
