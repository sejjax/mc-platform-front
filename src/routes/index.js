import React from 'react';

import { Redirect } from 'react-router-dom';

import ConfirmChangeDefaultWallet from 'pages/ConfirmChangeDefaultWallet/ConfirmChangeDefaultWallet.jsx';
import DepositAccruals from 'pages/DepositAccruals/DepositAccruals.jsx';
import Help from 'pages/Help';
import IncomeCalculator from 'pages/IncomeCalculator/IncomeCalculator.jsx';
import Investments from 'pages/Investments/Investments.jsx';
import Metrics from 'pages/Metrics/Metrics.jsx';
import NotificationsList from 'pages/Notifications';
import AdminNotifications from 'pages/Notifications/Admin/AdminNotifications.jsx';
import NotificationCreate from 'pages/Notifications/Admin/CreateNotification/NotificationCreate.jsx';
// import Withdraw from "pages/Withdraw"
import Projects from 'pages/Projects';
import Promotion from 'pages/Promotion/Promotion.jsx';
import ReferralAccruals from 'pages/ReferralAccurals/ReferralAccruals.jsx';
import Team from 'pages/Team/Team';
import TeamStructure from 'pages/TeamStructure/TeamStructure.jsx';

import EmailVerification from '../pages/Authentication/EmailVerification.jsx';
import ForgetPwd from '../pages/Authentication/ForgetPassword.jsx';
// Authentication related pages
import Login from '../pages/Authentication/Login.jsx';
import Logout from '../pages/Authentication/Logout';
import RecoverPwd from '../pages/Authentication/RecoverPassword.jsx';
import Register from '../pages/Authentication/Register.jsx';
// Profile
import UserProfile from '../pages/Authentication/UserProfile.jsx';
// Maybe will be need
import LockScreen from '../pages/AuthenticationInner/auth-lock-screen';
// import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
// import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"
// Dashboard
import Dashboard from '../pages/Dashboard/index';
import Deposit from '../pages/Deposit';
import InvestmentAnalyze from '../pages/InvestmentAnalyze';
import Pages404 from '../pages/Utility/pages-404';
import Pages500 from '../pages/Utility/pages-500';
import PagesComingsoon from '../pages/Utility/pages-comingsoon';
import PagesMaintenance from '../pages/Utility/pages-maintenance';

const authProtectedRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/deposit', component: Deposit },
  // { path: "/withdraw", component: Withdraw },
  { path: '/team', component: Team },
  { path: '/NotificationsList', component: NotificationsList },
  { path: '/help', component: Help },
  {
    path: '/investments',
    component: Investments,
  },
  { path: '/investments-analyzing', component: InvestmentAnalyze },
  {
    path: '/accruals/deposit',
    component: DepositAccruals,
  },
  {
    path: '/accruals/referral',
    component: ReferralAccruals,
  },

  // //profile
  { path: '/profile', component: UserProfile },

  {
    path: '/calculator',
    component: IncomeCalculator,
  },
  //Invoices

  //Projects
  { path: '/projects/:type', component: Projects },
  // { path: "/projects/:type/:slug", component: Project },
  { path: '/admin/metrics', component: Metrics },

  {
    path: '/team/structure/:partnerId',
    component: TeamStructure,
  },

  { path: '/admin/notificationsCreate', component: NotificationCreate },
  {
    path: '/admin/notificationsCreate/:notificationId',
    component: NotificationCreate,
  },
  { path: '/admin/notifications', component: AdminNotifications },
  {
    path: '/promotion',
    component: Promotion,
  },
  //Utility
  // { path: "/pages-starter", component: PagesStarter },
  // { path: "/pages-timeline", component: PagesTimeline },
  // { path: "/pages-faqs", component: PagesFaqs },
  // { path: "/pages-pricing", component: PagesPricing },

  // this route should be at the end of all other routes
  { path: '*', exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPwd },
  { path: '/deposit', component: Deposit },
  { path: '/register', component: Register },
  { path: `/password-change/:hash`, component: RecoverPwd },
  { path: '/confirm-email/:hash', component: EmailVerification },
  {
    path: '/change-default-wallet/:hash',
    component: ConfirmChangeDefaultWallet,
  },

  { path: '/pages-maintenance', component: PagesMaintenance },
  { path: '/pages-comingsoon', component: PagesComingsoon },
  { path: '/pages-404', component: Pages404 },
  { path: '/pages-500', component: Pages500 },

  // Authentication Inner
  { path: '/auth-lock-screen', component: LockScreen },
];

export { authProtectedRoutes, publicRoutes };
