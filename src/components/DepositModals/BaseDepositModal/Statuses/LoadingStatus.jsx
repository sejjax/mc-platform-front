import React, { useEffect, useState } from 'react';

import { Card, CardTitle, NavLink } from 'reactstrap';

import { SUPPORT_LINK } from 'constants/links';

import { t } from '../../../../i18n';

const LoadingStatus = ({ baseDeposit, redirectToInvest }) => {
  const [timer, setTimer] = useState(3 * 60 - 1);

  const timerFormatted = (() => {
    if (timer === 0) return { minutes: '0', seconds: '00' };
    const minutes = Math.floor(timer / 60);
    const seconds = timer - minutes * 60;
    return {
      minutes,
      seconds: seconds >= 10 ? seconds : `0${seconds}`,
    };
  })();

  useEffect(() => {
    if (timer > 0) {
      const timerSpeed = 1;
      const timeout = setInterval(() => {
        setTimer((prev) => prev - timerSpeed);
      }, timerSpeed * 1000);
      return () => clearInterval(timeout);
    }
  }, [timer]);

  return (
    <>
      {(timer !== 0 || baseDeposit) && (
        <Card className={'border border-primary mb-4'}>
          <div
            style={{
              padding: '15px 5px',
            }}>
            <div className="text-center">
              {timer !== 0 && (
                <>
                  <CardTitle className="fs-5">
                    &#8987; {t('deposit_modal_waiting_payment')} &#8987;
                  </CardTitle>
                  <div>
                    {t('deposit_modal_approximate_time', {
                      minutes: timerFormatted.minutes,
                      seconds: timerFormatted.seconds,
                    })}
                  </div>
                </>
              )}
              {timer === 0 && (
                <>
                  <div className="fs-5">{t('deposit_modal_check_investment_page')}</div>
                  <NavLink className="mt-1" onClick={redirectToInvest}>
                    {t('sidebar_investments_label')}
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </Card>
      )}
      <div className="text-center">
        <div className="fw-bold fs-5"></div>
        <div>
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

export default LoadingStatus;
