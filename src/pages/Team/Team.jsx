import React, { useEffect } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { MetaTags } from 'react-meta-tags';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import { getTeamInfo } from 'store/team/actions';
import { getTeamInfoSelector } from 'store/team/reducer';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import AllStructureInfo from './components/AllStructureInfo';
import FirstStructureInfo from './components/FirstStructureInfo';
import PartnersList from './components/PartnersList';

import { t } from '../../i18n';
import './scss/team.scss';

const Team = () => {
  const dispatch = useDispatch();
  const {
    totalReferrals,
    referralsIncome,
    teamDeposit,
    firstDeposit,
    firstReferrals,
    firstReferralsIncome,
  } = useSelector(getTeamInfoSelector);

  useEffect(() => {
    dispatch(getTeamInfo());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('team_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={t('team_structure')}
            hasBreadcrumbItem={false}
            breadcrumbItem={t('team_structure')}
          />
          <Row>
            <Col lg={6}>
              <AllStructureInfo
                totalReferrals={totalReferrals}
                referralsIncome={referralsIncome}
                teamDeposit={teamDeposit}
              />
            </Col>
            <Col lg={6}>
              <FirstStructureInfo
                firstDeposit={firstDeposit}
                firstReferrals={firstReferrals}
                firstReferralsIncome={firstReferralsIncome}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <PartnersList />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

Team.propTypes = {
  t: PropTypes.any,
  success: PropTypes.any,
};

export default withRouter(
  connect(mapStateProps, {})(withTranslation()(withForbiddenWithoutBuyingPackage(Team))),
);
