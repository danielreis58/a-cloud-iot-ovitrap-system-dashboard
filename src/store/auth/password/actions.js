import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  ERROR_PASSWORD,
  RESET_ERROR_PASSWORD
} from './actionTypes'

export const forgotPassword = (email) => ({
  type: FORGOT_PASSWORD,
  payload: { email }
})

export const forgotPasswordSuccess = (message) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: message
})

export const setNewPassword = (password, token) => ({
  type: SET_NEW_PASSWORD,
  payload: { password, token }
})

export const setNewPasswordSuccess = (message) => ({
  type: SET_NEW_PASSWORD_SUCCESS,
  payload: message
})

export const errorPassword = (error) => ({
  type: ERROR_PASSWORD,
  payload: error
})

export const resetErrorPassword = (error) => ({
  type: RESET_ERROR_PASSWORD,
  payload: error
})
