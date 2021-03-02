import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
} from "./actionTypes";

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  };
};

export const userForgetPasswordSuccess = (message) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userSetNewPassword = (user, history, pswToken) => {
  return {
    type: SET_NEW_PASSWORD,
    payload: { user, history, pswToken },
  };
};

export const userSetNewPasswordSuccess = (message) => {
  return {
    type: SET_NEW_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const apiError = (error) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: error,
  };
};
