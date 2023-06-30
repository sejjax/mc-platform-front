import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import gr from './locales/gr/translation.json';
import it from './locales/it/translation.json';
import ru from './locales/rs/translation.json';
import sp from './locales/sp/translation.json';

// the translations
const resources = {
  gr,
  it,
  ru,
  sp,
  en,
};

const FALLBACK_LANGUAGE = 'en';

const language = localStorage.getItem('I18N_LANGUAGE');
if (!language) {
  localStorage.setItem('I18N_LANGUAGE', 'en');
}

i18n.use(initReactI18next).use(LngDetector).init({
  fallbackLng: FALLBACK_LANGUAGE,
  resources,
});

export const t = (key, params) => String(i18n.t(key, params || {}));

export default i18n;
