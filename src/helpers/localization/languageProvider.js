import React, { useCallback, useEffect, useState } from 'react';

import i18next from 'i18next';

import LanguageContext from './languageContext';

const FALLBACK_LANGUAGE = 'en';
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('I18N_LANGUAGE') || FALLBACK_LANGUAGE,
  );

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = useCallback((languageCode) => {
    localStorage.setItem('I18N_LANGUAGE', languageCode);
    setLanguage(languageCode);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
