import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import PhotoSaga from "./auth/photo/load/saga"
import PhotoUploadSaga from "./auth/photo/upload/saga"
import ConfirmSaga from "./auth/confirmEmail/saga"
import LayoutSaga from "./layout/saga"
import projectSaga from "./projects/project/saga"
import riskSaga from "./projects/risk/saga"
import dashboardSaga from "./dashboard/saga"
import teamSaga from "./team/saga"
import notificationsSaga from "./notifications/saga"
import { watchWallet } from "./wallet/saga"
import { watchInvestmentsSaga } from "./investments/saga"
import { AccrualSaga } from "./accruals/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(ConfirmSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(PhotoSaga),
    fork(PhotoUploadSaga),
    fork(LayoutSaga),
    fork(projectSaga),
    fork(riskSaga),
    fork(dashboardSaga),
    fork(teamSaga),
    fork(notificationsSaga),
    fork(watchWallet),
    fork(watchInvestmentsSaga),
    fork(AccrualSaga),
  ])
}
