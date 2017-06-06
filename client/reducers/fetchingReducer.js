import {
  USER_REQUEST, USER_REQUEST_SUCCESS, USER_REQUEST_FAILURE
} from '../actions/user'

const initialState = {
  user: false,
  links: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        user: true
      }
    case USER_REQUEST_FAILURE:
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        user: false
      }
    default:
      return state
  }
}
