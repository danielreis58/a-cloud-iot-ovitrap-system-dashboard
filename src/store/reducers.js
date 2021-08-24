import { combineReducers } from 'redux'

// Theme
import Themes from './theme/reducer'

// Layout
import Layout from './layout/reducer'

// Auth
import Login from './auth/login/reducer'
import ForgetPassword from './auth/forgetpwd/reducer'

// Dashboard
import Dashboards from './dashboard/reducer'

// Data
import Companies from './companies/reducer'
import Users from './users/reducer'

const rootReducer = combineReducers({
  Login,
  ForgetPassword,
  Dashboards,
  Themes,
  Layout,
  Companies,
  Users
})

export default rootReducer
