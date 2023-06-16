import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import Photo from "./auth/photo/load/reducer"
import PhotoUpload from "./auth/photo/upload/reducer"
import ConfirmEmail from "./auth/confirmEmail/reducer"

//projects
import Project from "./projects/project/reducer"
import Risk from "./projects/risk/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

import Team from "./team/reducer"

//Notifications
import Notifications from "./notifications/reducer"
import Wallet from "./wallet/reducer"
import Accruals from "./accruals/reducer"
import Investments from "./investments/reducer"

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
})

export default rootReducer
