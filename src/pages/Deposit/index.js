import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"

import getAuthUser from "helpers/GetAuthUser"
import { MetaTags } from "react-meta-tags"

import ZeroLevel from "./levelZero"
import NonZero from "./nonZero"

const Deposit = props => {
  const [userLevel, setUserLevel] = useState(null)

  useEffect(() => {
    const user = getAuthUser()

    setUserLevel(user?.level || 1)
  }, [props.success])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Внесение средств MCapital</title>
        </MetaTags>
        {userLevel === 0 ? <ZeroLevel /> : <NonZero />}
      </div>
    </React.Fragment>
  )
}

Deposit.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStateProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateProps, {})(withTranslation()(Deposit))
)
