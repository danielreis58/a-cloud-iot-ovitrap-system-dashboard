import { combineReducers } from 'redux'

// Auth
import Login from './auth/login/reducer'
import ForgetPassword from './auth/forgetpwd/reducer'

// Dashboard
import Dashboards from './dashboard/reducer'

// Theme
import Themes from './theme/reducer'

// Layout
import Layout from './layout/reducer'

const rootReducer = combineReducers({
  Login,
  ForgetPassword,
  Dashboards,
  Themes,
  Layout
})

export default rootReducer
