import { all } from 'redux-saga/effects'

// Auth
import Login from './auth/login/saga'
import ForgetPassword from './auth/forgetpwd/saga'

// Dashboard
import Dashboards from './dashboard/saga'

// Datas
import Companies from './companies/saga'
import Users from './users/saga'

export default function* rootSaga() {
  yield all([Login(), ForgetPassword(), Dashboards(), Companies(), Users()])
}
