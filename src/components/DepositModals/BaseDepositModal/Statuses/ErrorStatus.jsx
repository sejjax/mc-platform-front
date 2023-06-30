import React from 'react';

import { Card, CardTitle } from 'reactstrap';

import { SUPPORT_LINK } from 'constants/links';

import { t } from '../../../../i18n';

const ErrorStatus = () => {
  return (
    <>
      <Card className={'border border-primary'}>
        <div
          style={{
            padding: '15px 5px',
          }}>
          <div className="text-center">
            <CardTitle className="fs-5">{t('common_was_error')}</CardTitle>
          </div>
        </div>
      </Card>
      <div className="text-center">
        <div className="fw-bold fs-5"></div>
        <div className="mt-2"></div>
        <div className="mt-4">
          <div className="mt-2 text-reset">{t('common_contact_support')}</div>
          <a href={SUPPORT_LINK} target="_blank" rel="noreferrer" className="mt-2 d-block">
            {t('common_write_support')}
          </a>
        </div>
      </div>
    </>
  );
};

export default ErrorStatus;
