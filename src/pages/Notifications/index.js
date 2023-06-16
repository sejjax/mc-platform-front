import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { MetaTags } from 'react-meta-tags';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"
// import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'reactstrap';

import Breadcrumbs from "../../components/Common/Breadcrumb";

import List from "./list"

const NotificationsList = () => {

  return (
    <React.Fragment>
      <div className='page-content'>
        <MetaTags>
          <title>Все уведомления MCapital</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title='Уведлмления'
            hasBreadcrumbItem={false}
            breadcrumbItem='Все уведомления'
          />
          <Row>
            <Col lg={12}>
              <List />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}



export default withRouter(NotificationsList)

