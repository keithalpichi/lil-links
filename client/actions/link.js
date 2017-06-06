import axios from 'axios'
import { createJWTHeader, getJWTFromStorage } from '../utils'
const CREATE_LINK_REQUEST = 'CREATE_LINK_REQUEST'
const FETCH_LINKS_REQUEST = 'FETCH_LINK_REQUEST'
const DELETE_LINK_REQUEST = 'DELETE_LINK_REQUEST'
const UPDATE_LINK_REQUEST = 'UPDATE_LINK_REQUEST'
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS'
export const CREATE_LINK_FAILURE = 'CREATE_LINK_FAILURE'
export const FETCH_LINKS_SUCCESS = 'FETCH_LINK_SUCCESS'
export const FETCH_LINKS_FAILURE = 'FETCH_LINK_FAILURE'
export const DELETE_LINK_SUCCESS = 'DELETE_LINK_SUCCESS'
export const DELETE_LINK_FAILURE = 'DELETE_LINK_SUCCESS'
export const UPDATE_LINK_SUCCESS = 'UPDATE_LINK_SUCCESS'
export const UPDATE_LINK_FAILURE = 'UPDATE_LINK_FAILURE'

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

export const deleteLink = shortlink => {
  return dispatch => {
    dispatch({ type: DELETE_LINK_REQUEST })
    let token = getJWTFromStorage()
    if (token) {
      axios.request({
        url: '/api/links',
        method: 'DELETE',
        headers: createJWTHeader(token),
        data: {
          shortlink: shortlink
        }
      })
      .then(res => {
        dispatch({ type: DELETE_LINK_SUCCESS, data: shortlink })
      })
      .catch(err => {
        dispatch({ type: DELETE_LINK_FAILURE, data: err })
      })
    }
  }
}

export const updateLink = (params) => {
  return dispatch => {
    dispatch({ type: UPDATE_LINK_REQUEST })
    let token = getJWTFromStorage()
    if (token) {
      axios.request({
        url: '/api/links',
        method: 'PUT',
        headers: createJWTHeader(token),
        data: params
      })
      .then(res => {
        dispatch({ type: UPDATE_LINK_SUCCESS, data: res.data })
      })
      .catch(err => {
        dispatch({ type: UPDATE_LINK_FAILURE, data: err })
      })
    }
  }
}
