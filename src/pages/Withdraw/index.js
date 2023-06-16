import React, { useEffect, useState } from "react"

import { MetaTags } from "react-meta-tags"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import { withRouter } from "react-router-dom"

import ZeroLevel from "pages/Deposit/levelZero"
import getAuthUser from "helpers/GetAuthUser"
import NonZeroLevel from "./nonZeroLevel"

const Withdraw = props => {
  const [userLevel, setUserLevel] = useState(null)

  useEffect(() => {
    const user = getAuthUser()

    setUserLevel(user.level || 1)
  }, [props.success])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Вывод средств MCapital</title>
        </MetaTags>
        {userLevel === 0 ? <ZeroLevel /> : <NonZeroLevel />}
      </div>
    </React.Fragment>
  )
}

Withdraw.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStateProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateProps, {})(withTranslation()(Withdraw))
)
