import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  API_ERROR_FORGET_PASSWORD
} from './actionTypes'

export const userForgetPassword = (user, history) => ({
  type: FORGET_PASSWORD,
  payload: { user, history }
})

export const userForgetPasswordSuccess = (message) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: message
})

export const userSetNewPassword = (user, history, pswToken) => ({
  type: SET_NEW_PASSWORD,
  payload: { user, history, pswToken }
})

export const userSetNewPasswordSuccess = (message) => ({
  type: SET_NEW_PASSWORD_SUCCESS,
  payload: message
})

export const apiErrorForgetPassword = (error) => ({
  type: API_ERROR_FORGET_PASSWORD,
  payload: error
})
