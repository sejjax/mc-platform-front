import React, { useCallback, useState } from "react"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap"

import CurrencyCard from "./currencyCard"

import BUSDIcon from "../../assets/images/icons/BUSD.svg"
import BNDIcon from "../../assets/images/icons/BNB.svg"
import ByTokenForm from "components/DepositModals/ByTokenForm/byTokenForm"

const NonZero = () => {
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
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-3 font-size-18">
                  Внести средства
                </CardTitle>
                <Card className="border">
                  <CardBody>
                    <CardText className="font-size-14">Валюта</CardText>
                    <Row>
                      {/* <Col sm={4}>
                        <CurrencyCard
                          title="BNB"
                          description="Binance Smart Chain"
                          icon={BNDIcon}
                          currentPrice="1 BNB = $ 500 = 10 000 TGT"
                          onClick={callback}
                          isActive={"BNB" === tokens}
                        />
                      </Col> */}
                      <Col sm={4}>
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
                      <Col lg={4}>
                        <ByTokenForm label={tokens} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default NonZero
