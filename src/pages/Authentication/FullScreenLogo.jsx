import React from "react"
import { Col } from "reactstrap"
import fullScreenLogo from "assets/images/fullscreen-logo.png"
import "./scss/fullscreen-logo.scss"

const FullScreenLogo = () => {
  return (
    <React.Fragment>
      <Col xl={8}>
        <img src={fullScreenLogo} className="fullscreen__logo" />
        <img className="fullscreen__logo_mobile " src="/logo.png" alt="" />
      </Col>
    </React.Fragment>
  )
}
export default FullScreenLogo
