import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { signOut } from '../actions/session'

class Navigation extends Component {
  renderSessionLinks () {
    const { user } = this.props
    if (user) {
      return (
        <div>
          <button onClick={this.props.signOut}>Log Out</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <h1>Navigation bar here</h1>
        {this.renderSessionLinks()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    location: props.match.url
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
