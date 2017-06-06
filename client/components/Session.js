import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn, signUp } from '../actions/session'

class Session extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.props.url === 'login') {
      this.props.signIn(this.state)
    } else {
      this.props.signUp(this.state)
    }
    this.props.history.push('/')
  }

  renderTransferLinks () {
    if (this.props.url === 'login') {
      return <p>Not signed up? <Link to='/signup'>Create an account now</Link></p>
    } else {
      return <p>Already signed up? <Link to='/login'>Login to your account now</Link></p>
    }
  }

  render () {
    return (
      <div id='session-container'>
        <h1>{this.props.url === 'login' ? 'Login' : 'Sign up' } to start making Lil' Links</h1>
        <form onSubmit={this.handleSubmit} id='session-form'>
          <label className='form-label'>
            Username
            <input className='form-input' type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          </label>

          <label className='form-label'>
            Email
            <input className='form-input' type='email' name='email' value={this.state.email} onChange={this.handleChange} />
          </label>

          <label className='form-label'>
            Password
            <input className='form-input' type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          </label>

          <div className='button-container'>
            <input className='form-submit' type='submit' value='Submit' />
          </div>
        </form>
        {this.renderTransferLinks()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: params => dispatch(signIn(params)),
    signUp: params => dispatch(signUp(params))
  }
}

export default connect(null, mapDispatchToProps)(Session)
