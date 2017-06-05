import axios from 'axios'
import { createJWTHeader, getJWTFromStorage } from '../utils'
const CREATE_LINK_REQUEST = 'CREATE_LINK_REQUEST'
const FETCH_LINKS_REQUEST = 'FETCH_LINK_REQUEST'
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS'
export const CREATE_LINK_FAILURE = 'CREATE_LINK_FAILURE'
export const FETCH_LINKS_SUCCESS = 'FETCH_LINK_SUCCESS'
export const FETCH_LINKS_FAILURE = 'FETCH_LINK_FAILURE'

export const createLink = url => {
  return dispatch => {
    let token = getJWTFromStorage()
    if (token) {
      dispatch({ type: CREATE_LINK_REQUEST })
      axios.request({
        url: '/api/links',
        method: 'POST',
        headers: createJWTHeader(token),
        data: {
          url: url
        }
      })
      .then(res => {
        dispatch({ type: CREATE_LINK_SUCCESS, data: res.data })
      })
      .catch(err => {
        dispatch({ type: CREATE_LINK_FAILURE, data: err })
      })
    }
  }
}

export const fetchLinks = () => {
  return dispatch => {
    let token = getJWTFromStorage()
    if (token) {
      dispatch({ type: FETCH_LINKS_REQUEST })
      axios.request({
        url: '/api/links',
        method: 'GET',
        headers: createJWTHeader(token)
      })
      .then(res => {
        dispatch({ type: FETCH_LINKS_SUCCESS, data: res.data })
      })
      .catch(err => {
        dispatch({ type: FETCH_LINKS_FAILURE, data: err })
      })
    }
  }
}
