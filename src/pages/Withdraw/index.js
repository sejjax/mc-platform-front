import React, { useEffect, useState } from 'react';

import getAuthUser from 'helpers/GetAuthUser';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ZeroLevel from 'pages/Deposit/levelZero';

import { t } from '../../i18n';
import NonZeroLevel from './nonZeroLevel';

const Withdraw = (props) => {
  const [userLevel, setUserLevel] = useState(null);

  useEffect(() => {
    const user = getAuthUser();

    setUserLevel(user.level || 1);
  }, [props.success]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('withdrawal_meta_title')}</title>
        </MetaTags>
        {userLevel === 0 ? <ZeroLevel /> : <NonZeroLevel />}
      </div>
    </React.Fragment>
  );
};

Withdraw.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStateProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(connect(mapStateProps, {})(withTranslation()(Withdraw)));
