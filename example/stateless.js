import React from 'react'
import { connect } from 'react-redux'

const Stateless = ({ serverData }) => (
  <div>
    <div>{serverData}</div>
  </div>
)

const mapState = (state) => ({ serverData: state.app.serverData })

export default connect(mapState)(Stateless)
