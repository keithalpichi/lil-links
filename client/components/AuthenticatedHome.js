import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkForm from './LinkForm'
import LinksList from './LinksList'
import { fetchLinks } from '../actions/link'

class AuthenticatedHome extends Component {
  componentWillMount () {
    if (this.props.links && this.props.links.length === 0) {
      this.props.fetchLinks()
    }
  }

  render () {
    return (
      <div>
        <h1>Hey {this.props.username}, check out your links or create new ones!</h1>
        <LinkForm />
        <LinksList links={this.props.links} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    links: state.links
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLinks: () => dispatch(fetchLinks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHome)
