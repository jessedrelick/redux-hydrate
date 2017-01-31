import React from 'react'
import { connect } from 'react-redux'

const Async = ({ asyncData }) => (
  <div>
    <div>Async data: {asyncData}</div>
  </div>
)

const mapState = (state) => ({ asyncData: state.app.asyncData })

export default connect(mapState)(Async)
