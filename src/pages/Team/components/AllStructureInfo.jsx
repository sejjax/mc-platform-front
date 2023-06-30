import React from 'react';

import { roundToDynamicNumbers } from 'helpers/Utils';
import dollarUS from 'helpers/dollarsUS';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';

import { t } from '../../../i18n';

const AllStructureInfo = ({ totalReferrals, referralsIncome, teamDeposit }) => {
  return (
    <Card className="same-height">
      <CardBody>
        <h3 className="font-size-15 mb-4">{t('team_structure_info')}</h3>
        <div className="team-info">
          <div className="info">
            <p className="info__name">{t('team_structure_partner_amount')}</p>
            <p className="info__value">{totalReferrals}</p>
          </div>
          <div className="info">
            <p className="info__name">{t('team_profitability')}</p>
            <p className="info__value">{`${dollarUS.format(
              roundToDynamicNumbers(teamDeposit, 100),
            )}`}</p>
          </div>
          <div className="info">
            <p className="info__name">{t('team_structure_profit')}</p>
            <p className="info__value">{`${dollarUS.format(
              roundToDynamicNumbers(referralsIncome, 100),
            )}`}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

AllStructureInfo.propTypes = {
  totalReferrals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  referralsIncome: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  teamDeposit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default AllStructureInfo;
