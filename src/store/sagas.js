import { all, fork } from 'redux-saga/effects';

import AccrualSaga from './accruals/saga';
import ConfirmSaga from './auth/confirmEmail/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import AuthSaga from './auth/login/saga';
import PhotoSaga from './auth/photo/load/saga';
import PhotoUploadSaga from './auth/photo/upload/saga';
import ProfileSaga from './auth/profile/saga';
//public
import AccountSaga from './auth/register/saga';
import dashboardSaga from './dashboard/saga';
import investmentsSaga from './investments/saga';
import LayoutSaga from './layout/saga';
import notificationsSaga from './notifications/saga';
import projectSaga from './projects/project/saga';
import riskSaga from './projects/risk/saga';
import teamSaga from './team/saga';
import { watchWallet } from './wallet/saga';

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
    fork(investmentsSaga),
    fork(AccrualSaga),
  ]);
}
