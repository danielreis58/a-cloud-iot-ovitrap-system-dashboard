import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  ERROR_PASSWORD,
  RESET_ERROR_PASSWORD
} from './actionTypes'

const initialState = {
  error: false,
  loading: false,
  success: false
}

const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      state = {
        loading: true,
        success: false
      }
      break
    case FORGOT_PASSWORD_SUCCESS:
      state = {
        loading: false,
        success: action.payload.message
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
        success: action.payload.message
      }
      break
    case ERROR_PASSWORD:
      state = {
        loading: false,
        success: false,
        error: action.payload
      }
      break
    case RESET_ERROR_PASSWORD:
      state = initialState
      break
    default:
      break
  }
  return state
}

export default forgotPassword
