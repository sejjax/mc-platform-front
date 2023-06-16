import PropTypes from "prop-types"
import React from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { connect } from "react-redux"
import Notifications from "../Notifications/Notifications"
import Referrals from "./Referrals"
import IncomeByLevel from "./IncomeByLevel"
import WelcomeComp from "./WelcomeComp.jsx"
import "./dashboard.scss"

const Dashboard = () => {
  const user = useSelector(state => state.Profile.user)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Дашборд MCapital</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title="Дашборд"
            hasBreadcrumbItem={false}
            breadcrumbItem="Дашборд"
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
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
  success: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Dashboard))
)
