import React from 'react'
import { connect } from 'react-redux'

const Async = ({ serverData }) => (
  <div>
    <div>Async data: {serverData}</div>
  </div>
)

const mapState = (state) => ({ serverData: state.app.serverData })

export default connect(mapState)(Async)
