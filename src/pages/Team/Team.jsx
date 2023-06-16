import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { MetaTags } from "react-meta-tags"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { withTranslation } from "react-i18next"
import { Container, Row, Col } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import "./scss/team.scss"
import AllStructureInfo from "./components/AllStructureInfo"
import FirstStructureInfo from "./components/FirstStructureInfo"

import PartnersList from "./components/PartnersList"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import { getTeamInfo } from "store/team/actions"
import { useSelector } from "react-redux"
import { getTeamInfoSelector } from "store/team/reducer"

const Team = () => {
  const dispatch = useDispatch()
  const {
    totalReferrals,
    referralsIncome,
    teamDeposit,
    firstDeposit,
    firstReferrals,
    firstReferralsIncome,
  } = useSelector(getTeamInfoSelector)

  useEffect(() => {
    dispatch(getTeamInfo())
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Команда MCapital</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title="Структура команды"
            hasBreadcrumbItem={false}
            breadcrumbItem="Структура команды"
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
  )
}

const mapStateProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

Team.propTypes = {
  t: PropTypes.any,
  success: PropTypes.any,
}

export default withRouter(
  connect(
    mapStateProps,
    {}
  )(withTranslation()(withForbiddenWithoutBuyingPackage(Team)))
)
