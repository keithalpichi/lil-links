import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class UnauthenticatedHome extends Component {
  linkTo (path) {
    this.props.history.push(path)
  }

  render () {
    return (
      <div className='center'>
        <div className='center'>
          <h1 className='large'>Shorten long hideous links to Lil' Links</h1>
          <img src='corgi-96.png' id='main-img' />
          <button onClick={() => this.linkTo('/signup')} >Sign Up</button>
          <Link to='/login'>Log In</Link>
        </div>
        <div className='section main'>
          <h1>Lil' Link is a Url Shortener</h1>
          <h2>Give it a long url and it will make it shorter</h2>
          <div className='container'>
            <div className='half col secondary'>
              <h1>Before</h1>
              <p>"https://www.asuperlongwebsitename.com/when/will/this/ever/stop/idk"</p>
            </div>
            <div className='half col secondary'>
              <h1>After</h1>
              <p>"lill.ink/eb294r3"</p>
            </div>
          </div>
        </div>
        <div className='section'>
          <div className='container'>
            <div className='third col'>
              <h2>Share short simple links across the web!</h2>
              <p>Make them easily clickable and shareable</p>
            </div>
            <div className='third col'>
              <h2>Store all the links you create on Lil' Link</h2>
              <p>Have a single place to create, delete, and store all your Lil' Links</p>
            </div>
            <div className='third col'>
              <h2>Gain valuable information on trending links</h2>
              <p>Follow which links are trending and get the most clicks</p>
            </div>
          </div>
        </div>
        <div className='section main'>
          <p>Built by <a href='http://keithalpichi.com/' target='_blank'>Keith Alpichi</a></p>
        </div>
      </div>
    )
  }
}

export default withRouter(UnauthenticatedHome)
