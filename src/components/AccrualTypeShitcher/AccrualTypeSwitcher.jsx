import React from 'react';

import classNames from 'classnames';

import useTranslation from '../../hooks/useTranslation';
import s from './AccrualTypeSwitcher.module.scss';

const AccrualTypeSwitcher = ({ value, onChange, ...otherProps }) => {
  const t = useTranslation();
  const language = localStorage.getItem('I18N_LANGUAGE');

  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div className={classNames(s.switchContainer, s[language])}>
      <label className={classNames(s.switch, s[language])}>
        <span
          className={classNames(s.switchLabel, s[language], {
            [s.active]: !value,
          })}>
          <div>{t('common_referral_income')}</div>
        </span>
        <input type="checkbox" checked={value} onChange={handleChange} {...otherProps} />
        <span className={classNames(s.slider, s[language], { [s.checked]: value })}></span>
        <span
          className={classNames(s.switchLabel, s[language], {
            [s.active]: value,
          })}>
          <div>{t('common_passive_income')}</div>
        </span>
      </label>
    </div>
  );
};

export default AccrualTypeSwitcher;
