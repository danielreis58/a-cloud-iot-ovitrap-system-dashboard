import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_API_ERROR,
} from "./actionTypes";

const initialState = {
  error: false,
  loading: false,
  data: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        error: false,
        loading: true,
        data: null,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        error: false,
        loading: false,
        data: action.payload,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, error: false, loadingLogout: true, success: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = {
        ...state,
        error: false,
        loadingLogout: false,
        success: true,
        data: null,
      };
      break;
    case LOGIN_API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
      break;
    default:
      break;
  }
  return state;
};

export default login;
