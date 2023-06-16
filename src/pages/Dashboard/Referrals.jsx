import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap"

import "./sass/notification.scss"

import { getReferrals } from "store/actions"

const LEVEL_LABELS = [
  "Неактивных",
  "Первый уровень",
  "Второй уровень",
  "Третий уровень",
  "Четвертый уровень",
  "Пятый уровень",
  "Шестой уровень",
  "Седьмой уровень",
  "Восьмой уровень",
  "Девятый уровень",
  "Десятый уровень"
]

const Referrals = ({ user, referrals, onGetReferrals }) => {
  const userLevel = user.level

  useEffect(() => {
    onGetReferrals()
  }, [])

  const hasReferrals = React.useMemo(() => {
    if (!referrals) {
      return false
    }

    for (const count of referrals) {
      if (count !== 0) {
        return true
      }
    }

    return false
  }, [referrals])

  const maxLevels = referrals?.length ?? 0
  return (
    <Card
      className="p-3 same-height"
      style={{
        overflowY: "auto",
        maxHeight: "350px",
      }}
    >
      <CardTitle className="mb-0">
        <div className="title">
          <h4 className="font-size-15">Рефералы</h4>
          <p className="font-size-13 title__count">Количество</p>
        </div>
      </CardTitle>
      <CardBody className="p-0">
        {!hasReferrals && (
          <div className="referrals-zero">
            <div>
              <p>У Вас ещё нет приглашённых партнёров</p>
            </div>
          </div>
        )}
        {!!userLevel && hasReferrals && (
          <div>
            {Array.from({ length: maxLevels }, (_value, index) => {
              const level = (index + 1) % maxLevels
              const label = LEVEL_LABELS[level]
              const count = referrals?.[level]

              if (!count) {
                return null
              }

              return (
                <Row className="border-top" key={level}>
                  <div className={level > 0 ? "referrals" : "inactive"}>
                    <div className="level-typography">
                      {level !== 0 && (
                        <div className="small-level">{level}</div>
                      )}
                      <span className="font-weight-600">{label}</span>
                    </div>
                    <span className="active-count">{count}</span>
                  </div>
                </Row>
              )
            })}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

Referrals.propTypes = {
  user: PropTypes.shape({
    level: PropTypes.number,
  }),
  referrals: PropTypes.arrayOf(PropTypes.number),
  onGetReferrals: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    referrals: state.Dashboard.referrals,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetReferrals: () => dispatch(getReferrals()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Referrals)
