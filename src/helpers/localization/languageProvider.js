import React, { useEffect, useState } from 'react';

import i18n from 'i18next';

import LanguageContext from './languageContext';

const FALLBACK_LANGUAGE = 'en';
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('I18N_LANGUAGE') || FALLBACK_LANGUAGE,
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (languageCode) => {
    localStorage.setItem('I18N_LANGUAGE', languageCode);
    setLanguage(languageCode);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
