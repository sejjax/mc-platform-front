const layoutTypes = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
}

const layoutWidthTypes = {
  FLUID: "fluid",
  BOXED: "boxed",
  SCROLLABLE: "scrollable",
}

const topBarThemeTypes = {
  LIGHT: "light",
  DARK: "dark",
  COLORED: "colored",
}

const leftBarThemeImageTypes = {
  NONE: "none",
  IMG1: "img1",
  IMG2: "img2",
  IMG3: "img3",
  IMG4: "img4",
}

const leftSidebarTypes = {
  DEFAULT: "default",
  COMPACT: "compact",
  ICON: "icon",
}

const leftSideBarThemeTypes = {
  LIGHT: "light",
  COLORED: "colored",
  DARK: "dark",
  WINTER: "winter",
  LADYLIP: "ladylip",
  PLUMPLATE: "plumplate",
  STRONGBLISS: "strongbliss",
  GREATWHALE: "greatwhale",
}

export const API_UNKNOWN_ERROR = "Что-то пошло не так попробуйте позже"
export const API_AUTH_ERROR =
  "Ошибка авторизации или время сеанса истекло, повторите попытку авторизации"

export {
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftBarThemeImageTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
}
