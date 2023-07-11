import React, { useContext, useEffect, useState } from 'react';

import languages from 'common/languages';
import { convertLocale } from 'helpers/convertLocation';
import LanguageContext from 'helpers/localization/languageContext';
import i18next from 'i18next';
import { get, map } from 'lodash';
import { withTranslation } from 'react-i18next';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//i18n
import i18n from '../../../i18n';

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  // const [selectedLang, setSelectedLang] = useState('');
  const { language, changeLanguage } = useContext(LanguageContext);

  const [menu, setMenu] = useState(false);

  // useEffect(() => {
  //   const currentLanguage = localStorage.getItem('I18N_LANGUAGE');
  //   setSelectedLang(currentLanguage);
  // }, []);

  const changeLanguageAction = (lang) => {
    //set language as i18n
    changeLanguage(lang);
  };

  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item " tag="button">
          <img src={languages[language]?.flag} alt="Skote" height="16" className="me-1" />
        </DropdownToggle>
        <DropdownMenu className="language-switch dropdown-menu-end">
          {Object.keys(languages).map((key) => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${language === key ? 'active' : 'none'}`}>
              <img src={languages[key].flag} alt="Skote" className="me-1" height="12" />
              <span className="align-middle">{get(languages, `${key}.label`)}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default withTranslation()(LanguageDropdown);
