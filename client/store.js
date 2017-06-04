import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/index'

let middlewares
let enhancers

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger()
  const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  middlewares = applyMiddleware(thunk, logger)
  enhancers = compose(
    middlewares,
    reduxDevTool
  )
} else {
  middlewares = applyMiddleware(thunk)
  enhancers = compose(middlewares)
}

const store = createStore(rootReducer, enhancers)

export default store
