import {
  RESET_DASHBOARDS,
  RESET_ERROR_DASHBOARDS,
  GET_DASHBOARDS,
  SET_DASHBOARDS,
  API_ERROR_DASHBOARD
} from './actionTypes'

const initialState = {
  errorDashboard: false,
  loadingDashboard: false,
  dataDashboard: null,
  successDashboard: false
}

const Dashboards = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DASHBOARDS:
      state = {
        ...state,
        dataDashboard: {
          ...state.dataDashboard,
          [action.payload.target]: null
        }
      }
      break
    case RESET_ERROR_DASHBOARDS:
      state = {
        ...state,
        errorDashboard: {
          ...state.errorDashboard,
          [action.payload.target]: false
        },
        loadingDashboard: {
          ...state.loadingDashboard,
          [action.payload.target]: false
        },
        successDashboard: {
          ...state.successDashboard,
          [action.payload.target]: false
        }
      }
      break
    case GET_DASHBOARDS:
      state = {
        ...state,
        errorDashboard: {
          ...state.errorDashboard,
          [action.payload.target]: false
        },
        loadingDashboard: {
          ...state.loadingDashboard,
          [action.payload.target]: true
        },
        successDashboard: {
          ...state.successDashboard,
          [action.payload.target]: false
        },
        dataDashboard: {
          ...state.dataDashboard,
          [action.payload.target]: null
        }
      }
      break
    case SET_DASHBOARDS:
      state = {
        ...state,
        errorDashboard: {
          ...state.errorDashboard,
          [action.payload.target]: false
        },
        loadingDashboard: {
          ...state.loadingDashboard,
          [action.payload.target]: false
        },
        successDashboard: {
          ...state.successDashboard,
          [action.payload.target]: true
        },
        dataDashboard: {
          ...state.dataDashboard,
          [action.payload.target]: action.payload.data
        }
      }
      break
    case API_ERROR_DASHBOARD:
      state = {
        ...state,
        errorDashboard: {
          ...state.errorDashboard,
          [action.payload.target]: action.payload.error
        },
        loadingDashboard: {
          ...state.loadingDashboard,
          [action.payload.target]: false
        },
        successDashboard: {
          ...state.successDashboard,
          [action.payload.target]: false
        }
      }
      break
    default:
      break
  }
  return state
}

export default Dashboards
