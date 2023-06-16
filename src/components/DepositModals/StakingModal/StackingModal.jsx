import React, { useCallback, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap"
import PropTypes from "prop-types"
import ByTokenForm from "pages/Deposit/byTokenForm"
import CurrencyCard from "pages/Deposit/currencyCard"
import BUSDIcon from "../../../assets/images/icons/BUSD.svg"
import StackingForm from "./StackingForm/StackingForm"
import { useSelector } from "react-redux"

const StackingModal = () => {
  const [tokens, setTokens] = useState("BUSD")

  const changeTokenHandler = token => {
    setTokens(token)
  }

  const callback = useCallback(
    token => {
      changeTokenHandler(token)
    },
    [tokens]
  )

  return (
    <Row>
      <Col sm={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-3 font-size-18">Стейкинг</CardTitle>
            <Card className="border">
              <CardBody>
                <CardText className="font-size-14">Валюта</CardText>
                <Row>
                  <Col>
                    <CurrencyCard
                      title="BUSD"
                      description="Binance Smart Chain"
                      icon={BUSDIcon}
                      currentPrice="1 BUSD = 1 $ = 1 MC"
                      onClick={callback}
                      isActive={"BUSD" === tokens}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <StackingForm label={tokens} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default StackingModal
