import { all } from 'redux-saga/effects'

// public
import AuthSaga from './auth/login/saga'
import ForgetSaga from './auth/forgetpwd/saga'

// Dashboard
import Dashboards from './dashboard/saga'

export default function* rootSaga() {
  yield all([AuthSaga(), ForgetSaga(), Dashboards()])
}
