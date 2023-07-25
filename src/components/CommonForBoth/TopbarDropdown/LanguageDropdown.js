import React, { useContext, useEffect, useState } from 'react';

import languages from 'common/languages';
import i18next from 'i18next';
import { get, map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//i18n
import { changeLanguage } from '../../../store/layout/actions';

const LanguageDropdown = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.Layout.language);
  const [menu, setMenu] = useState(false);

  const changeLanguageAction = (lang) => {
    dispatch(changeLanguage(lang));
    localStorage.setItem('I18N_LANGUAGE', lang);
    i18next.changeLanguage(lang);
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

export default LanguageDropdown;
