import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UnauthenticatedHome extends Component {
  render () {
    return (
      <div id='home-header'>
        <h1 className='large'>Shorter links are just better!</h1>
        <img src='corgi-96.png' id='main-img' />
        <h2>Don't be that person that shares hideously long links</h2>
        <button><Link to='/signup'>Sign Up</Link></button>
        <Link to='/login'>Log In</Link>
      </div>
    )
  }
}

export default UnauthenticatedHome
