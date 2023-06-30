import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MetaTags } from 'react-meta-tags';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';

import { getStatusMessage } from 'store/actions';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import StatusMessage from './components/StatusMessage/StatusMessage';
import UsersAccess from './components/UsersAccess/UsersAccess';
import UsersTable from './components/UsersTable/UsersTable';

import { usersNavItems } from './UsersManagmentConstants';

const UsersManagment = (props) => {
  const [customActiveTab, setcustomActiveTab] = useState(0);

  const dispatch = useDispatch();

  const { statusMessage } = useSelector((state) => state.Users);

  const onTabClick = (tabNumber) => {
    return () => {
      if (customActiveTab !== tabNumber) {
        setcustomActiveTab(tabNumber);
      }
    };
  };
  return (
    <React.Fragment>
      {statusMessage !== null && <StatusMessage success={statusMessage} />}
      <div className="page-content">
        <MetaTags>
          <title>Users</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Users" hasBreadcrumbItem={false} breadcrumbItem="Users" />
          <Card>
            <CardBody>
              <Nav tabs className="nav-tabs-custom align-items-end">
                {usersNavItems.map((tabName, item) => (
                  <NavItem key={`navItem_${tabName}`}>
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: customActiveTab === item,
                      })}
                      onClick={onTabClick(item)}>
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home" />
                      </span>
                      <span className="d-none d-sm-block">{tabName}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>

              <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId={0}>
                  <UsersTable />
                </TabPane>
                <TabPane tabId={1}>
                  <UsersAccess />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

UsersManagment.propTypes = {};

export default UsersManagment;
