import React from 'react';

import { Card, CardTitle, NavLink } from 'reactstrap';

import { SUPPORT_LINK } from 'constants/links';

import { t } from '../../../../i18n';

const SuccessStatus = ({ baseDeposit, redirectToInvest }) => {
  return (
    <>
      <Card className={'border border-primary'}>
        <div
          style={{
            padding: '15px 5px',
          }}>
          <div className="text-center">
            <CardTitle className="fs-5">
              &#9989; {t('deposit_modal_funds_successfully_enrolled')} &#9989;
            </CardTitle>
            {baseDeposit && (
              <>
                <div>{t('deposit_modal_go_to_investments_packages')}</div>
                <NavLink className="mt-1 text-primary" onClick={redirectToInvest}>
                  {t('investments_packages')}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Card>
      <div className="text-center">
        <div className="fw-bold fs-5"></div>
        <div className="mt-2"></div>
        <div className="mt-4">
          <div className="mt-2 text-reset">{t('deposit_modal_payment_questions')}</div>
          <div className="mt-2 text-reset">{t('common_contact_support')}</div>
          <a href={SUPPORT_LINK} target="_blank" rel="noreferrer" className="mt-2 d-block">
            {t('common_write_support')}
          </a>
        </div>
      </div>
    </>
  );
};

export default SuccessStatus;
