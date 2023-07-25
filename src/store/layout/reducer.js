// @flow
//constants
import {
  layoutTypes,
  layoutWidthTypes,
  leftBarThemeImageTypes,
  leftSideBarThemeTypes,
  leftSidebarTypes,
  topBarThemeTypes,
} from '../../constants/layout';
import {
  CHANGE_LANGUAGE,
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_PRELOADER,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_THEME_IMAGE,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  SHOW_SIDEBAR,
  TOGGLE_LEFTMENU,
} from './actionTypes';

const INIT_STATE = {
  layoutType: layoutTypes.VERTICAL,
  layoutWidth: layoutWidthTypes.FLUID,
  leftSideBarTheme: leftSideBarThemeTypes.DARK,
  leftSideBarThemeImage: leftBarThemeImageTypes.NONE,
  leftSideBarType: leftSidebarTypes.DEFAULT,
  topbarTheme: topBarThemeTypes.LIGHT,
  isPreloader: false,
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
  language: window.localStorage.getItem('I18N_LANGUAGE') || 'en',
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };
    case CHANGE_PRELOADER:
      return {
        ...state,
        isPreloader: action.payload,
      };

    case CHANGE_LAYOUT_WIDTH:
      return {
        ...state,
        layoutWidth: action.payload,
      };
    case CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSideBarTheme: action.payload,
      };
    case CHANGE_SIDEBAR_THEME_IMAGE:
      return {
        ...state,
        leftSideBarThemeImage: action.payload,
      };
    case CHANGE_SIDEBAR_TYPE:
      return {
        ...state,
        leftSideBarType: action.payload.sidebarType,
      };
    case CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarTheme: action.payload,
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      };
    case TOGGLE_LEFTMENU:
      return {
        ...state,
        leftMenu: action.payload,
      };

    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};

export default Layout;
