import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { signOut } from '../actions/session'

class Navigation extends Component {
  linkTo (path) {
    this.props.history.push(path)
  }

  renderSessionLinks () {
    const { user } = this.props
    if (user) {
      return (
        <div>
          <button className='navlink' onClick={this.props.signOut}>Log Out</button>
        </div>
      )
    } else {
      return (
        <div>
          <button className='navlink' onClick={() => this.linkTo('/login')} >Log In</button>
          <button className='navlink' onClick={() => this.linkTo('/signup')} >Sign Up</button>
        </div>
      )
    }
  }

  render () {
    return (
      <div id='navbar'>
        <h1 id='title'><Link to='/' >Lil' Link</Link></h1>
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
