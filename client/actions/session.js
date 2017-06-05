import axios from 'axios'
import { setJWTInStorage, removeJWTFromStorage } from '../utils'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'

export const signUp = (params) => {
  return dispatch => {
    dispatch({ type: SIGN_UP_REQUEST })
    axios.request({
      url: '/api/users?session=signup',
      method: 'POST',
      data: params
    })
    .then(res => {
      if (res.data.token) {
        setJWTInStorage(res.data.token)
        dispatch({ type: SIGN_UP_SUCCESS, data: res.data })
      } else {
        throw new Error('No valid token')
      }
    })
    .catch(err => {
      dispatch({ type: SIGN_UP_FAILURE, data: err })
    })
  }
}

export const signIn = (params) => {
  return dispatch => {
    dispatch({ type: SIGN_IN_REQUEST })
    axios.request({
      url: '/api/users?session=login',
      method: 'POST',
      data: params
    })
    .then(res => {
      if (res.data.token) {
        setJWTInStorage(res.data.token)
        dispatch({ type: SIGN_IN_SUCCESS, data: res.data })
      } else {
        throw new Error('No valid token')
      }
    })
    .catch(err => {
      dispatch({ type: SIGN_IN_FAILURE, data: err })
    })
  }
}

export const signOut = () => {
  return dispatch => {
    removeJWTFromStorage()
    dispatch({ type: SIGN_OUT_REQUEST })
  }
}
