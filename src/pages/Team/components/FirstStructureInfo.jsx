import React from 'react';

import { roundToDynamicNumbers } from 'helpers/Utils';
import dollarUS from 'helpers/dollarsUS';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';

import { t } from '../../../i18n';

const FirstStructureInfo = ({ firstDeposit, firstReferrals, firstReferralsIncome }) => {
  return (
    <Card className="same-height">
      <CardBody className="">
        <div className="partners-title">
          <h4 className="font-size-15 mb-4">{t('team_first_line_partner')}</h4>
        </div>
        <div>
          <div className="team-info">
            <div className="info">
              <p className="info__name">{t('team_first_line_referrals')}</p>
              <p className="info__value">{firstReferrals}</p>
            </div>
            <div className="info">
              <p className="info__name">{t('team_first_line_profit')}</p>
              <p className="info__value">{`${dollarUS.format(
                roundToDynamicNumbers(firstDeposit, 100),
              )}`}</p>
            </div>
            <div className="info">
              <p className="info__name">{t('team_first_line_structure_profit')}</p>
              <p className="info__value">{`${dollarUS.format(
                roundToDynamicNumbers(firstReferralsIncome, 100),
              )}`}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FirstStructureInfo;

FirstStructureInfo.propTypes = {
  firstDeposit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  firstReferrals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  firstReferralsIncome: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
