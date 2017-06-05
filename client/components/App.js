import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import Home from './Home'
import Navigation from './Navigation'
import Session from './Session'

class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' render={() => <Session url='login' />} />
          <Route path='/signup' render={() => <Session url='signup' />} />
          <Route path='*' render={() => <h2>404: Not Found</h2>} />
        </Switch>
      </div>
    )
  }
}

export default App
