import React, { Component } from 'react'
import { Route } from 'react-router'
import Home from './Home'
import Navigation from './Navigation'

class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <Route exact path='/' component={Home} />
        <Route path="*" render={() => <h2>404: Not Found</h2>} />
      </div>
    )
  }
}

export default App
