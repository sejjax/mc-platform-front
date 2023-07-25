import { combineReducers } from 'redux';

import Accruals from './accruals/reducer';
import ConfirmEmail from './auth/confirmEmail/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';
// Authentication
import Login from './auth/login/reducer';
import Photo from './auth/photo/load/reducer';
import PhotoUpload from './auth/photo/upload/reducer';
import Profile from './auth/profile/reducer';
import Account from './auth/register/reducer';
import Currency from './currency/reducer';
//Dashboard
import Dashboard from './dashboard/reducer';
import Investments from './investments/reducer';
// Front
import Layout from './layout/reducer';
//Notifications
import Notifications from './notifications/reducer';
import PaginationReducer from './paginations/reducer';
//projects
import Project from './projects/project/reducer';
import Risk from './projects/risk/reducer';
import Team from './team/reducer';
import Wallet from './wallet/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Photo,
  PhotoUpload,
  ConfirmEmail,
  Project,
  Risk,
  Dashboard,
  Team,
  Notifications,
  Wallet,
  Investments,
  Accruals,
  Currency,
  PaginationReducer,
});

export default rootReducer;
