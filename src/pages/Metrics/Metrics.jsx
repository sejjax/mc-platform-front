import React, { useState } from 'react';
import { useEffect } from 'react';

import incomeImg from 'assets/images/metrics-income.svg';
import classnames from 'classnames';
import { roundToDynamicNumbers } from 'helpers/Utils';
import { get } from 'helpers/api_helper';
import withAdmin from 'hocs/withAdmin';
import { MetaTags } from 'react-meta-tags';
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import AnotherTable from 'components/AnotherTable/Table';

import { ACCESS } from 'constants/access';

import useTranslation from '../../hooks/useTranslation';
import {
  metricsNavDisplayedTitles,
  metricsTableNavItems,
  projectsTable,
  usersTable,
} from './MetricsContstants';

const Metrics = () => {
  const t = useTranslation();
  const [projectsTab, setProjectsTab] = useState('year');
  const [usersTab, setUsersTab] = useState('year');
  const [data, setData] = useState({
    activeUsers: 0,
    inactiveUsers: 0,
    sumAccrualsInTheNextSevenDays: 0,
    sumAllSendedProducts: 0,
    sumAllSendedReferrals: 0,
    allAccruals: 0,
    partnerRates: {
      day: [],
      month: [],
      week: [],
      year: [],
    },
    platformIncome: 0,
    projectRates: {
      day: [],
      week: [],
      month: [],
      year: [],
    },
  });

  const selectedProjectData = data.projectRates[projectsTab];
  const selectedPartnerData = data.partnerRates[usersTab];

  useEffect(() => {
    const fetchMetricsData = async () => {
      const data = await get('metrics');
      setData(data);
    };
    fetchMetricsData();
  }, []);

  const tabHandler = (state, tabNumber) => {
    return () => {
      if (state === 'project') {
        if (projectsTab !== tabNumber) {
          return setProjectsTab(tabNumber);
        }
      }
      if (state === 'user') {
        if (usersTab !== tabNumber) {
          setUsersTab(tabNumber);
        }
      }
    };
  };

  return (
    <div className="page-content">
      <MetaTags>
        <title>{t('metrics_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem={t('sidebar_metrics_label')}
        />
        <Row>
          <Card>
            <CardBody>
              <h3 className="metrics__platform_data_title">{t('metrics_general_data')}</h3>
              <div className="metrics__platform_data_wrapper">
                <div className="metrics__platform_data_item">
                  {t('metrics_total_income')}
                  <div className="metrics__platform_data_item_content">
                    <img src={incomeImg} />
                    {roundToDynamicNumbers(data.platformIncome, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  {t('metrics_active_users')}
                  <div className="metrics__platform_data_item_content">{data.activeUsers}</div>
                </div>
                <div className="metrics__platform_data_item">
                  {t('metrics_inactive_users')}
                  <div className="metrics__platform_data_item_content">{data.inactiveUsers}</div>
                </div>
                <div className="metrics__platform_data_item">
                  {t('metrics_partners_paid')}
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(data.sumAllSendedReferrals, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  {t('metrics_investors_paid')}
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(data.sumAllSendedProducts, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  {t('metrics_to_be_paid_seven_day')}
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(data.sumAccrualsInTheNextSevenDays, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  {t('metrics_total_to_be_paid')}
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(data.allAccruals, 1)}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between flex-wrap-mobile">
                <div className="metrics__table_title">{t('metrics_best_partners')}</div>
                <Nav tabs className="nav-tabs-custom align-items-center flex-wrap-mobile">
                  {metricsTableNavItems.map((tabName) => (
                    <NavItem key={`navItem_${tabName}`}>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: usersTab === tabName,
                        })}
                        onClick={tabHandler('user', tabName)}>
                        <span className="d-block">{metricsNavDisplayedTitles(t)[tabName]}</span>
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
              <AnotherTable data={selectedPartnerData} columns={usersTable(t)} keyField="id" />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between flex-wrap-mobile">
                <div className="metrics__table_title">{t('metrics_top_rated_projects')}</div>
                <Nav tabs className="nav-tabs-custom align-items-center">
                  {metricsTableNavItems.map((tabName) => (
                    <NavItem key={`navItem_${tabName}`}>
                      <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                          active: projectsTab === tabName,
                        })}
                        onClick={tabHandler('project', tabName)}>
                        <span className="d-block">{metricsNavDisplayedTitles[tabName]}</span>
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>

              <AnotherTable data={selectedProjectData} keyField="id" columns={projectsTable(t)} />
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default withAdmin(Metrics, ACCESS.metrics);
