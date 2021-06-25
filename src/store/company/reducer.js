import { RESET_DATA, GET_DATA, SET_DATA } from './actionTypes'

const initialState = {
  data: null,
  loading: false,
  success: false,
  error: false
}

const Companies = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DATA:
      state = {
        ...state,
        [action.payload.target]: initialState[action.payload.target]
      }
      break
    case GET_DATA:
      state = {
        ...state,
        loading: true,
        success: false,
        error: false
      }
      break
    case SET_DATA:
      state = {
        ...state,
        [action.payload.target]: action.payload.data,
        loading: false
      }
      break
    default:
      break
  }
  return state
}

export default Companies
