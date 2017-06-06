import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createLink } from '../actions/link'

class LinkForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      url: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.createLink(this.state.url)
    this.setState({
      url: ''
    })
  }

  render () {
    return (
      <form id='link-form' onSubmit={this.handleSubmit}>
        <input id='link-form-input' type='text' name='link'
          value={this.state.url} onChange={this.handleChange}
          placeholder={'To make a lil\' link place it here!'}
        />
        <input id='link-form-submit' type='submit' value='Submit' />
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createLink: url => dispatch(createLink(url))
  }
}

export default connect(null, mapDispatchToProps)(LinkForm)
