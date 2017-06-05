import { CREATE_LINK_SUCCESS, FETCH_LINKS_SUCCESS } from '../actions/link'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LINK_SUCCESS:
      return [
        ...state,
        action.data
      ]
    case FETCH_LINKS_SUCCESS:
      return action.data
    default:
      return state
  }
}
