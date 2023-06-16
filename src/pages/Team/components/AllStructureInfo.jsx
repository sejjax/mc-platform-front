import React from "react"
import { Card, CardBody } from "reactstrap"
import dollarUS from "helpers/dollarsUS"
import { roundToDynamicNumbers } from "helpers/Utils"
import PropTypes from "prop-types"

const AllStructureInfo = ({ totalReferrals, referralsIncome, teamDeposit }) => {
  return (
    <Card className="same-height">
      <CardBody>
        <h3 className="font-size-15 mb-4">Информация о структуре</h3>
        <div className="team-info">
          <div className="info">
            <p className="info__name">Всего партнёров привлечено</p>
            <p className="info__value">{totalReferrals}</p>
          </div>
          <div className="info">
            <p className="info__name">Приход средств от команды</p>
            <p className="info__value">{`${dollarUS.format(
              roundToDynamicNumbers(teamDeposit, 100)
            )}`}</p>
          </div>
          <div className="info">
            <p className="info__name">Доход со структуры</p>
            <p className="info__value">{`${dollarUS.format(
              roundToDynamicNumbers(referralsIncome, 100)
            )}`}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

AllStructureInfo.propTypes = {
  totalReferrals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  referralsIncome: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  teamDeposit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
export default AllStructureInfo
