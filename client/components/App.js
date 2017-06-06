import React, { Component } from 'react'
import { getJWTFromStorage } from '../utils'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { fetchUser } from '../actions/user'
import { Route, Switch } from 'react-router'
import Home from './Home'
import Navigation from './Navigation'
import Session from './Session'

class App extends Component {
  componentWillMount () {
    const { user } = this.props
    const token = getJWTFromStorage()
    if (!user && token) {
      this.props.fetchUser(token)
    }
  }

  render () {
    const { user, fetchingUser } = this.props
    if (fetchingUser) { return null }
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/' render={() => <Home user={user} />} />
          <Route path='/login' render={props => {
            return !user ? <Session url='login' {...props} /> : <Redirect to='/' />
          }} />
          <Route path='/signup' render={props => {
            return !user ? <Session url='signup' {...props} /> : <Redirect to='/' />
          }} />
          <Route path='*' render={() => <h2>404: Not Found</h2>} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    fetchingUser: state.fetching.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: token => dispatch(fetchUser(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
