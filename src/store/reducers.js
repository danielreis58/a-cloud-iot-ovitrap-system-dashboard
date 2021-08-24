import { combineReducers } from 'redux'

// Theme
import Themes from './theme/reducer'

// Layout
import Layout from './layout/reducer'

// Auth
import Login from './auth/login/reducer'
import ForgetPassword from './auth/forgetpwd/reducer'

// Data
import Dashboards from './dashboard/reducer'
import Companies from './companies/reducer'
import Users from './users/reducer'
import Ovitraps from './ovitraps/reducer'

const rootReducer = combineReducers({
  Login,
  ForgetPassword,
  Dashboards,
  Themes,
  Layout,
  Companies,
  Users,
  Ovitraps
})

export default rootReducer
