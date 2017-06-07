import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class UnauthenticatedHome extends Component {
  linkTo (path) {
    this.props.history.push(path)
  }

  render () {
    return (
      <div id='home-header'>
        <h1 className='large'>Shorter links are just better!</h1>
        <img src='corgi-96.png' id='main-img' />
        <h2>Samson the Corgi will appreciate it</h2>
        <button className='navlink' onClick={() => this.linkTo('/signup')} >Sign Up</button>
        <Link to='/login'>Log In</Link>
      </div>
    )
  }
}

export default withRouter(UnauthenticatedHome)
