import {
  CHANGE_LANGUAGE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_PRELOADER,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_THEME_IMAGE,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  TOGGLE_LEFTMENU,
} from './actionTypes';

export const changePreloader = (layout) => ({
  type: CHANGE_PRELOADER,
  payload: layout,
});

export const changeLayoutWidth = (width) => ({
  type: CHANGE_LAYOUT_WIDTH,
  payload: width,
});

export const changeSidebarTheme = (theme) => ({
  type: CHANGE_SIDEBAR_THEME,
  payload: theme,
});

export const changeSidebarThemeImage = (themeimage) => ({
  type: CHANGE_SIDEBAR_THEME_IMAGE,
  payload: themeimage,
});

export const changeSidebarType = (sidebarType, isMobile) => {
  return {
    type: CHANGE_SIDEBAR_TYPE,
    payload: { sidebarType, isMobile },
  };
};

export const changeTopbarTheme = (topbarTheme) => ({
  type: CHANGE_TOPBAR_THEME,
  payload: topbarTheme,
});

// TODO ERROR SHOW_SIDEBAR is not defined
// export const showSidebar = isopen => ({
//   type: SHOW_SIDEBAR,
//   payload: isopen,
// })

export const toggleLeftmenu = (isopen) => ({
  type: TOGGLE_LEFTMENU,
  payload: isopen,
});

export const changeLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  payload: language,
});
