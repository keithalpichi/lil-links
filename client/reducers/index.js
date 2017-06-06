import { combineReducers } from 'redux'
import userReducer from './userReducer'
import linkReducer from './linkReducer'
import fetchingReducer from './fetchingReducer'

const rootReducer = combineReducers({
  user: userReducer,
  links: linkReducer,
  fetching: fetchingReducer
})

export default rootReducer
