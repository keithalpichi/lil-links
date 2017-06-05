import axios from 'axios'
export const USER_REQUEST = 'USER_REQUEST'
export const USER_REQUEST_SUCCESS = 'USER_REQUEST_SUCCESS'
export const USER_REQUEST_FAILURE = 'USER_REQUEST_FAILURE'

export const fetchUser = token => {
  return dispatch => {
    dispatch({ type: USER_REQUEST })
    axios.request({
      url: '/api/users',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: USER_REQUEST_SUCCESS, data: res.data })
    })
  }
}