import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../actions/user'
import { Route, Switch } from 'react-router'
import Home from './Home'
import Navigation from './Navigation'
import Session from './Session'

class App extends Component {
  componentWillMount () {
    const { user } = this.props
    const token = window.localStorage.getItem('lil-link-jwt')
    if (!user && token) {
      this.props.fetchUser(token)
    }
  }

  render () {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' render={props => <Session url='login' {...props} />} />
          <Route path='/signup' render={props => <Session url='signup' {...props} />} />
          <Route path='*' render={() => <h2>404: Not Found</h2>} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: token => dispatch(fetchUser(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
