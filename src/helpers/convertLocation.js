export function convertLocale(locale) {
  locale = locale.toLowerCase();

  if (locale.includes('ru')) {
    return 'ru';
  }

  if (locale.includes('en')) {
    return 'en';
  }

  return 'en';
}
