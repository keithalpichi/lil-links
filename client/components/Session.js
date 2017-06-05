import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    // dispatch action to POST to /users
    e.preventDefault()
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
      <div>
        <h1>{this.props.url === 'login' ? 'Login' : 'Sign up' } to start making Lil' Links</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          </label>

          <label>
            Email
            <input type='email' name='email' value={this.state.email} onChange={this.handleChange} />
          </label>

          <label>
            Password
            <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          </label>

          <label>
            Submit
            <input type='submit' value='Submit' />
          </label>
        </form>
        {this.renderTransferLinks()}
      </div>
    )
  }
}

export default Session
