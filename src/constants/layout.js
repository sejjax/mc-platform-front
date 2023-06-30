import { t } from '../i18n';

const layoutTypes = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

const layoutWidthTypes = {
  FLUID: 'fluid',
  BOXED: 'boxed',
  SCROLLABLE: 'scrollable',
};

const topBarThemeTypes = {
  LIGHT: 'light',
  DARK: 'dark',
  COLORED: 'colored',
};

const leftBarThemeImageTypes = {
  NONE: 'none',
  IMG1: 'img1',
  IMG2: 'img2',
  IMG3: 'img3',
  IMG4: 'img4',
};

const leftSidebarTypes = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  ICON: 'icon',
};

const leftSideBarThemeTypes = {
  LIGHT: 'light',
  COLORED: 'colored',
  DARK: 'dark',
  WINTER: 'winter',
  LADYLIP: 'ladylip',
  PLUMPLATE: 'plumplate',
  STRONGBLISS: 'strongbliss',
  GREATWHALE: 'greatwhale',
};

export const API_UNKNOWN_ERROR = t('core_unknown_error');
export const API_AUTH_ERROR = t('core_auth_error');

export {
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftBarThemeImageTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
};
