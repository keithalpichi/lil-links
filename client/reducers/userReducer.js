import {
  SIGN_UP_SUCCESS, SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE, SIGN_UP_FAILURE
} from '../actions/session'
import {
  USER_REQUEST_SUCCESS, USER_REQUEST_FAILURE
} from '../actions/user'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
    case USER_REQUEST_SUCCESS:
      return {
        id: action.data.id,
        username: action.data.username,
        email: action.data.email
      }
    case USER_REQUEST_FAILURE:
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
    default:
      return state
  }
}
