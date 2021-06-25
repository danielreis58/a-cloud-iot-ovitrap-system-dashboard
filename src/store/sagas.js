import { all } from 'redux-saga/effects'

// Auth
import AuthSaga from './auth/login/saga'
import ForgetSaga from './auth/forgetpwd/saga'

// Dashboard
import Dashboards from './dashboard/saga'

// Companies
import Companies from './company/saga'

export default function* rootSaga() {
  yield all([AuthSaga(), ForgetSaga(), Dashboards(), Companies()])
}
