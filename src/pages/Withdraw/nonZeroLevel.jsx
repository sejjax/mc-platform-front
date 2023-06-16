import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

import WithdrawFrom from "./form"
import HistoryTable from "./table"

import fakeHistoryData from "./fakeHistoryData"

const NonZeroLevel = () => {
  const [activeTab, setActiveTab] = useState("1")

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col xl={7} sm={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-3 font-size-18">Вывод средств</CardTitle>
                <Card>
                  <ul
                    className="nav nav-tabs nav-tabs-custom pt-2"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        to="#"
                        className={{
                          active: activeTab === "1",
                        }}
                        onClick={() => {
                          setActiveTab("1")
                        }}
                      >
                        Вывести
                      </NavLink>
                    </NavItem>
                  </ul>
                  <TabContent className="p-4" activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col>
                          <div
                            style={{
                              display: "grid",
                              gap: "50px",
                            }}
                          >
                            <Row>
                              <Col sm={4}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <i className="fas fa-wallet"></i>
                                  <p
                                    style={{
                                      marginBottom: "0",
                                      paddingLeft: "10px",
                                      color: "#495057",
                                    }}
                                  >
                                    Доступно к выводу
                                  </p>
                                </div>
                                <div className="mt-2">
                                  <strong>$ 9,148.23</strong>
                                </div>
                              </Col>
        
                            </Row>
                            <Row>
                              <WithdrawFrom />
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>
              </CardBody>
            </Card>
          </Col>
          <Col xl={5} sm={12}>
            <HistoryTable withdrawalsHistory={fakeHistoryData} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default NonZeroLevel
