import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR_LOGIN
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

export const apiErrorLogin = (error) => ({
  type: API_ERROR_LOGIN,
  payload: error
})
