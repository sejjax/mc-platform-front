import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import AllStructureInfo from "pages/Team/components/AllStructureInfo"
import FirstStructureInfo from "pages/Team/components/FirstStructureInfo"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useParams, withRouter } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import { getUserStructure } from "services/teamService"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import List from "../Team/components/List"

const TeamStructure = () => {
  const [referrals, setReferrals] = useState([])
  const [teamInfo, setTeamInfo] = useState({
    firstDeposit: "0",
    firstReferrals: 0,
    firstReferralsIncome: "0",
    referralsIncome: "0",
    teamDeposit: "0",
    totalReferrals: 0,
  })
  const {
    firstDeposit,
    firstReferrals,
    firstReferralsIncome,
    referralsIncome,
    teamDeposit,
    totalReferrals,
  } = teamInfo

  const [userData, setUserData] = useState({
    fullName: "",
    partnerId: "",
  })
  const [error, setError] = useState(null)
  const { partnerId } = useParams()

  useEffect(() => {
    const fetchUserStructure = async () => {
      try {
        const data = await getUserStructure(partnerId)

        setUserData({ fullName: data.fullName, partnerId: data.partnerId })
        setReferrals(data.referrals)
        setTeamInfo(data.teamInfo)
      } catch (error) {
        if (error.response.status === 403) {
          setError("Доступ запрещен")
        }
      }
    }
    fetchUserStructure()
  }, [])

  return (
    <div className="page-content">
      <MetaTags>
        <title>Структура партнёра MCaptial</title>
      </MetaTags>
      <Container fluid>
        {!error && (
          <>
            <Breadcrumbs
              title="Структура партнёра"
              hasBreadcrumbItem={false}
              breadcrumbItem={`Структура партнёра ${userData.fullName}`}
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
                <Card>
                  <CardBody>
                    <List
                      fullName={userData.fullName}
                      partners={referrals}
                      userPartnerId={userData.partnerId}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
        {error && <h5>{error}</h5>}
      </Container>
    </div>
  )
}

export default withRouter(withForbiddenWithoutBuyingPackage(TeamStructure))
