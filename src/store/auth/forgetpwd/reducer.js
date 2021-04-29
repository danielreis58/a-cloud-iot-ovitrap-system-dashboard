import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS
} from './actionTypes'

const initialState = {
  message: null,
  error: null,
  loading: false,
  success: false
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        loading: true,
        success: false
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        loading: false,
        success: true,
        message: action.payload
      }
      break
    case SET_NEW_PASSWORD:
      state = {
        loading: true,
        success: false
      }
      break
    case SET_NEW_PASSWORD_SUCCESS:
      state = {
        loading: false,
        success: true,
        message: action.payload
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = {
        loading: false,
        error: action.payload
      }
      break
    default:
      break
  }
  return state
}

export default forgetPassword
