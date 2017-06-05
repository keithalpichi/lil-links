import { combineReducers } from 'redux'
import userReducer from './userReducer'
import linkReducer from './linkReducer'

const rootReducer = combineReducers({
  user: userReducer,
  links: linkReducer
})

export default rootReducer
