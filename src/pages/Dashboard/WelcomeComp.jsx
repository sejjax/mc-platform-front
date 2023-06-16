import React from "react"
import PropTypes from "prop-types"

import { Row, Col, Card } from "reactstrap"

import { CopyToClipboard } from "react-copy-to-clipboard"

import "./sass/notification.scss"
import "./sass/welcomeComp.scss"
import { useSelector } from "react-redux"
import {
  allStructureLevels,
  firstStructureLevels,
  partnerLevelToDisplayedName,
} from "constants/levels"
import DefaultProfileImage from "./DefaultProfileImage"
import { useToasts } from "react-toast-notifications"
import { roundToDynamicNumbers } from "helpers/Utils"

const WelcomeComp = ({ user }) => {
  const {
    level,
    investorLevel,
    fullName,
    partnerId,
    needToAllStructure,
    needToFirstStructure,
  } = user
  const { addToast } = useToasts()

  const originLocation = window && window?.location.origin
  const { photo } = useSelector(state => ({
    photo: state.Photo.photo,
  }))
  return (
    <React.Fragment>
      <Card className="overflow-hidden same-height dashboard__left_card">
        <div style={{ padding: "0 1.25rem", margin: "15px 0" }}>
          <Row>
            <Col
              xs="4"
              className="align-self-end"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              <div>
                <img
                  src={photo ?? DefaultProfileImage}
                  width="100px"
                  alt={`${fullName} photo`}
                  className="img-thumbnail rounded-circle"
                />
              </div>
            </Col>
            <Col
              xs="8"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              <div className="text-primary">
                <span className="text-primary">{fullName}</span>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            borderTop: "1px solid #EFF2F7",
            alignItems: "center",
            padding: "0 1.25rem 10px",
            paddingTop: "10px",
          }}
        >
          <Row className="align-items-center">
            <Col sm="4">
              <span className="font-size-15">Ваш уровень</span>
            </Col>
            <Col sm="8">
              <div className="level-container" style={{ gap: "10px" }}>
                <div className="level">
                  <span>{level + 1}</span>
                </div>
                <div className="typography">
                  <p className="font-size-12">
                    {partnerLevelToDisplayedName[level]}
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {investorLevel !== 0 && (
            <>
              <div className="mt-3">
                <div className="text-center dashboard__to_next_title">
                  Карьерный рост. Цель: Уровень {level + 2}
                </div>
                <div className="dashbaord__level_title">Личные продажи</div>
                <div className="dashboard__to_next_level">
                  <div className="dashboard__level_amount">
                    {firstStructureLevels[level]}$
                  </div>
                  <div className="dashboard__level_amount">
                    {firstStructureLevels[level + 1]}$
                  </div>
                  <div className="level__line">
                    <div
                      className="level__line_first"
                      style={{ width: `${needToFirstStructure.percent}%` }}
                    ></div>
                  </div>
                  <div className="dashboard__level_amount">
                    Сделано:{" "}
                    {firstStructureLevels[level + 1] -
                      roundToDynamicNumbers(needToFirstStructure.value, 1)}
                    $
                  </div>
                  <div className="dashboard__level_amount">
                    Осталось:{" "}
                    {roundToDynamicNumbers(needToFirstStructure.value, 1)}$
                  </div>
                </div>
                <div className="dashbaord__level_title">
                  Структурные продажи (включая личные)
                </div>
                <div className="dashboard__to_next_level">
                  <div className="dashboard__level_amount">
                    {allStructureLevels[level]}$
                  </div>
                  <div className="dashboard__level_amount">
                    {allStructureLevels[level + 1]}$
                  </div>
                  <div className="level__line">
                    <div
                      className="level__line_second"
                      style={{ width: `${needToAllStructure.percent}%` }}
                    ></div>
                  </div>
                  <div className="dashboard__level_amount">
                    Сделано:{" "}
                    {allStructureLevels[level + 1] -
                      roundToDynamicNumbers(needToAllStructure.value, 1)}
                    $
                  </div>
                  <div className="dashboard__level_amount">
                    Осталось:{" "}
                    {roundToDynamicNumbers(needToAllStructure.value, 1)}$
                  </div>
                </div>
              </div>
            </>
          )}
          <Row
            className="mt-3"
            style={{ borderTop: "1px solid #EFF2F7", alignItems: "center" }}
          >
            <Col style={{ marginTop: "18px" }}>
              <div>Ваша реферальная ссылка</div>
              <div className="d-flex align-items-center">
                <span className="copy__link">
                  {`${originLocation}/register?partner_id=${partnerId}`}
                </span>
                <CopyToClipboard
                  text={`${originLocation}/register?partner_id=${partnerId}`}
                  onCopy={() =>
                    addToast("Реферальная ссылка успешна скопирована", {
                      appearance: "success",
                      autoDismiss: true,
                    })
                  }
                >
                  <button className="btn font-size-18 p-0 m-0">
                    <i className="bx bx-copy" style={{ color: "#1890FF" }} />
                  </button>
                </CopyToClipboard>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </React.Fragment>
  )
}

const MemoizedWelcomeComp = React.memo(WelcomeComp)

export default MemoizedWelcomeComp

WelcomeComp.propTypes = {
  user: PropTypes.shape({
    level: PropTypes.number,
    fullName: PropTypes.string,
    partnerId: PropTypes.string,
    deposit: PropTypes.number,
    createdAt: PropTypes.string,
    needToAllStructure: PropTypes.any,
    needToFirstStructure: PropTypes.any,
  }),
}
