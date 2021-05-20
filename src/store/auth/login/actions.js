import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR_LOGIN,
  API_RESET_LOGIN
} from './actionTypes'

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
})

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: {}
})

export const logoutUserSuccess = (message) => ({
  type: LOGOUT_USER_SUCCESS,
  payload: message
})

export const apiErrorLogin = (message) => ({
  type: API_ERROR_LOGIN,
  payload: message
})

export const apiResetLogin = () => ({
  type: API_RESET_LOGIN,
  payload: {}
})
