import { CREATE_LINK_SUCCESS, FETCH_LINKS_SUCCESS, DELETE_LINK_SUCCESS } from '../actions/link'

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
    case DELETE_LINK_SUCCESS:
      const i = state.findIndex(link => link.shortlink === action.data)
      if (i >= 0) {
        return [
          ...state.slice(0, i),
          ...state.slice(i + 1)
        ]
      } else {
        return state
      }
    default:
      return state
  }
}
