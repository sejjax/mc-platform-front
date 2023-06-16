import React, { useState } from "react"
import { MetaTags } from "react-meta-tags"
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import incomeImg from "assets/images/metrics-income.svg"
import {
  usersTable,
  metricsTableNavItems,
  projectsTable,
  metricsNavDisplayedTitles,
} from "./MetricsContstants"
import classnames from "classnames"
import AnotherTable from "components/AnotherTable/Table"
import { useEffect } from "react"
import { get } from "helpers/api_helper"
import { roundToDynamicNumbers } from "helpers/Utils"
import withAdmin from "hocs/withAdmin"
import { ACCESS } from "constants/access"

const Metrics = () => {
  const [projectsTab, setProjectsTab] = useState("year")
  const [usersTab, setUsersTab] = useState("year")
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
  })

  const selectedProjectData = data.projectRates[projectsTab]
  const selectedPartnerData = data.partnerRates[usersTab]

  useEffect(() => {
    const fetchMetricsData = async () => {
      const data = await get("metrics")
      setData(data)
    }
    fetchMetricsData()
  }, [])

  const tabHandler = (state, tabNumber) => {
    return () => {
      if (state === "project") {
        if (projectsTab !== tabNumber) {
          return setProjectsTab(tabNumber)
        }
      }
      if (state === "user") {
        if (usersTab !== tabNumber) {
          setUsersTab(tabNumber)
        }
      }
    }
  }

  return (
    <div className="page-content">
      <MetaTags>
        <title>MCapital Метрики</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem="Метрики"
        />
        <Row>
          <Card>
            <CardBody>
              <h3 className="metrics__platform_data_title">
                Общие данные платформы
              </h3>
              <div className="metrics__platform_data_wrapper">
                <div className="metrics__platform_data_item">
                  Суммарный доход
                  <div className="metrics__platform_data_item_content">
                    <img src={incomeImg} />
                    {roundToDynamicNumbers(data.platformIncome, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  Активные пользователи
                  <div className="metrics__platform_data_item_content">
                    {data.activeUsers}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  Неактивные пользователи
                  <div className="metrics__platform_data_item_content">
                    {data.inactiveUsers}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  Выплачено партнёрам
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(data.sumAllSendedReferrals, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  Выплачено инвесторам
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(data.sumAllSendedProducts, 1)}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  К выплате на 7 дней
                  <div className="metrics__platform_data_item_content">
                    {roundToDynamicNumbers(
                      data.sumAccrualsInTheNextSevenDays,
                      1
                    )}
                  </div>
                </div>
                <div className="metrics__platform_data_item">
                  Всего к выплате
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
                <div className="metrics__table_title">Лучшие партнеры</div>
                <Nav
                  tabs
                  className="nav-tabs-custom align-items-center flex-wrap-mobile"
                >
                  {metricsTableNavItems.map(tabName => (
                    <NavItem key={`navItem_${tabName}`}>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: usersTab === tabName,
                        })}
                        onClick={tabHandler("user", tabName)}
                      >
                        <span className="d-block">
                          {metricsNavDisplayedTitles[tabName]}
                        </span>
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
              <AnotherTable
                data={selectedPartnerData}
                columns={usersTable}
                keyField="id"
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between flex-wrap-mobile">
                <div className="metrics__table_title">
                  Проекты с самым высоким рейтингом
                </div>
                <Nav tabs className="nav-tabs-custom align-items-center">
                  {metricsTableNavItems.map(tabName => (
                    <NavItem key={`navItem_${tabName}`}>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: projectsTab === tabName,
                        })}
                        onClick={tabHandler("project", tabName)}
                      >
                        <span className="d-block">
                          {metricsNavDisplayedTitles[tabName]}
                        </span>
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>

              <AnotherTable
                data={selectedProjectData}
                keyField="id"
                columns={projectsTable}
              />
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default withAdmin(Metrics, ACCESS.metrics)
