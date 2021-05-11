import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR_LOGIN
} from './actionTypes'

const initialState = {
  success: false,
  loading: false,
  error: false,
  data: null
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        success: true,
        loading: false,
        error: false,
        data: action.payload
      }
      break
    case LOGOUT_USER:
      state = {
        ...state,
        loading: true
      }
      break
    case LOGOUT_USER_SUCCESS:
      state = {
        ...state,
        success: true,
        loading: false,
        error: false,
        data: action.payload
      }
      break
    case API_ERROR_LOGIN:
      state = {
        ...state,
        success: false,
        loading: false,
        error: action.payload
      }
      break
    default:
      break
  }
  return state
}

export default login
