import { useContext } from 'react';

import LanguageContext from 'helpers/localization/languageContext';
import i18n from 'i18next';

import { t } from '../i18n';

// Assuming your t function is exported from your i18n code

const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  return (key = '', params = {}) => String(i18n.t(key, { ...params, lng: language }));
};

export default useTranslation;
