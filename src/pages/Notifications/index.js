import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withTranslation } from 'react-i18next';
import { Col, Container, Row } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import { t } from '../../i18n';
import List from './list';

const NotificationsList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('notification_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={t('notification_title')}
            hasBreadcrumbItem={false}
            breadcrumbItem={t('notification_all')}
          />
          <Row>
            <Col lg={12}>
              <List />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(NotificationsList);
