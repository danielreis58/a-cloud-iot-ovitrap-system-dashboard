import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_API_ERROR
} from './actionTypes'

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
})

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
})

export const logoutUser = (history, isExpired) => ({
  type: LOGOUT_USER,
  payload: { history, isExpired }
})

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
  payload: {}
})

export const apiError = (error) => ({
  type: LOGIN_API_ERROR,
  payload: error
})
