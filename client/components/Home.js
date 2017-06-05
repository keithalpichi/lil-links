import React, { Component } from 'react'
import AuthenticatedHome from './AuthenticatedHome'
import UnauthenticatedHome from './UnauthenticatedHome'
import { connect } from 'react-redux'

class Home extends Component {
  render () {
    const { user } = this.props
    return user ? <AuthenticatedHome {...user} /> : <UnauthenticatedHome />
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
