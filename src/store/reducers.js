import { combineReducers } from 'redux'

// Authentication
import Login from './auth/login/reducer'
import ForgetPassword from './auth/forgetpwd/reducer'

// Dashboard
import Dashboards from './dashboard/reducer'

const rootReducer = combineReducers({
  Login,
  ForgetPassword,
  Dashboards
})

export default rootReducer
