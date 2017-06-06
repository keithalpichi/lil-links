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
          <button><Link to='/login'>Log In</Link></button>
          <button><Link to='/signup'>Sign Up</Link></button>
        </div>
      )
    }
  }

  render () {
    return (
      <div id='navbar'>
        <h1 id='title'><Link to='/' >Lil' Links</Link></h1>
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
