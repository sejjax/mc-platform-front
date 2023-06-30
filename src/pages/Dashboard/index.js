import React from 'react';

import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import MetaTags from 'react-meta-tags';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import { t } from '../../i18n';
import Notifications from '../Notifications/Notifications';
import IncomeByLevel from './IncomeByLevel';
import Referrals from './Referrals';
import WelcomeComp from './WelcomeComp.jsx';
import './dashboard.scss';

const Dashboard = () => {
  const user = useSelector((state) => state.Profile.user);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('dashboard_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={t('dashboard_breadcrumbs_title')}
            hasBreadcrumbItem={false}
            breadcrumbItem={t('dashboard_breadcrumbs_title')}
          />
          <Row>
            <Col xl="4">{user && <WelcomeComp user={user} />}</Col>
            <Col>
              <Notifications />
            </Col>
          </Row>
          {!!user.investorLevel && (
            <Row>
              <Col xl={8}>
                <IncomeByLevel />
              </Col>
              <Col>{user && <Referrals user={user} />}</Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
  success: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(connect(mapStatetoProps, {})(withTranslation()(Dashboard)));
