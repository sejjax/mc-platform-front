import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';

import { getReferrals } from 'store/actions';

import useTranslation from '../../hooks/useTranslation';
import './sass/notification.scss';

const LEVEL_LABELS = [
  'inactive',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
];

const Referrals = ({ user, referrals, onGetReferrals }) => {
  const userLevel = user.level + 1;
  const t = useTranslation();

  useEffect(() => {
    onGetReferrals();
  }, [onGetReferrals]);

  const hasReferrals = React.useMemo(() => {
    if (!referrals?.referralsCount.length) {
      return false;
    }

    for (const item of referrals?.referralsCount) {
      if (item.count > 0) {
        return true;
      }
    }

    return false;
  }, [referrals]);

  return (
    <Card
      className="p-3 same-height"
      style={{
        overflowY: 'auto',
        maxHeight: '350px',
      }}>
      <CardTitle className="mb-0">
        <div className="title">
          <h4 className="font-size-15">{t('dashboard_referrals_title')}</h4>
          <p className="font-size-13 title__count">{t('common_amount')}</p>
        </div>
      </CardTitle>
      <CardBody className="p-0">
        {!hasReferrals && (
          <div className="referrals-zero">
            <div>
              <p>{t('dashboard_not_have_referrals')}</p>
            </div>
          </div>
        )}
        {!!userLevel && hasReferrals && (
          <div>
            {referrals?.referralsCount.map(({ level, count }) => {
              const label = t(`referrals_levels.${LEVEL_LABELS[level]}`);
              return (
                <Row className="border-top" key={level}>
                  <div className={level > 0 ? 'referrals' : 'inactive'}>
                    <div className="level-typography">
                      {level !== 0 && <div className="small-level">{level}</div>}
                      <span className="font-weight-600">{label}</span>
                    </div>
                    <span className="active-count">{count}</span>
                  </div>
                </Row>
              );
            })}
            <Row className="border-top">
              <div className="referrals">
                <div className="level-typography">
                  <span className="font-weight-600">{t('common_inactive')}</span>
                </div>
                <span className="active-count">{referrals?.referralsWithoutAnyDepositsCount}</span>
              </div>
            </Row>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

Referrals.propTypes = {
  user: PropTypes.shape({
    level: PropTypes.number,
  }),
  referrals: PropTypes.shape({
    referralsCount: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.number,
        count: PropTypes.number,
      }),
    ),
    referralsWithoutAnyDepositsCount: PropTypes.number,
  }),
  onGetReferrals: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    referrals: state.Dashboard.referrals,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetReferrals: () => dispatch(getReferrals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Referrals);
