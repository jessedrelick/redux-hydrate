import React from 'react'
import { connect } from 'react-redux'

class Component extends React.Component {

  componentWillMount() {
    // If these are executed even after state is hydrated it will result in infinite loop
    if (!this.props.hydrate.ready) {
      this.props.dispatch({ type: 'HYDRATE_REGISTER', resolve: ['ASYNC_SUCCESS', 'ASYNC_FAIL'] })
      this.props.dispatch({ type: 'ASYNC_START' })
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

const mapState = (state) => ({ hydrate: state.hydrate, serverData: state.app.serverData })

export default connect(mapState)(Component)
