import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS
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

export const apiError = (error) => ({
  type: FORGET_PASSWORD_ERROR,
  payload: error
})
