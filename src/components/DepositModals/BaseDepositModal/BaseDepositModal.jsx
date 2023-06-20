import React, { useCallback, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import PropTypes from "prop-types"
import ByTokenForm from "components/DepositModals/ByTokenForm/byTokenForm"
import CurrencyCard from "pages/Deposit/currencyCard"
import BUSDIcon from "../../../assets/images/icons/BUSD.svg"
import USDTIcon from "../../../assets/images/icons/busdt.svg"
import LoadingStatus from "./Statuses/LoadingStatus"
import SuccessStatus from "./Statuses/SuccessStatus"
import { withRouter } from "react-router-dom"
import ErrorStatus from "./Statuses/ErrorStatus"

export const DepositStatus = {
  init: "init",
  loading: "loading",
  success: "success",
  error: "error",
}

const BaseDepositModal = ({ defaultValue, closeModal, history }) => {
  const [tokens, setTokens] = useState("USDT")
  const [depositStatus, setDepositStatus] = useState(DepositStatus.init)
  const [baseDepositContent, setBaseDepositContent] = useState(false)

  const changeTokenHandler = token => {
    setTokens(token)
  }

  const callback = useCallback(
    token => {
      changeTokenHandler(token)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens]
  )
  const redirectToInvest = () => {
    closeModal()
    history.push("/investments")
  }

  return (
    <Row>
      <Col sm={12}>
        <Card className="mb-0">
          <CardBody>
            <CardTitle className="mb-3 font-size-18">Внести средства</CardTitle>
            <Card className="border">
              <CardBody>
                <Row>
                  <Col>
                    {depositStatus === DepositStatus.init && (
                      <CurrencyCard
                        title="USDT BEP20"
                        description="Будьте внимательны при выборе сети: она должна быть BEP20."
                        icon={USDTIcon}
                        currentPrice="1 USDT = 1 $ = 1 MC"
                        onClick={callback}
                        isActive={"USDT" === tokens}
                      />
                    )}
                    {depositStatus === DepositStatus.error && <ErrorStatus />}
                    {depositStatus === DepositStatus.loading && (
                      <LoadingStatus
                        redirectToInvest={redirectToInvest}
                        baseDeposit={baseDepositContent}
                      />
                    )}
                    {depositStatus === DepositStatus.success && (
                      <SuccessStatus
                        baseDeposit={baseDepositContent}
                        redirectToInvest={redirectToInvest}
                      />
                    )}
                  </Col>
                </Row>
                {depositStatus === DepositStatus.init && (
                  <Row>
                    <Col>
                      <ByTokenForm
                        setBaseDepositContent={setBaseDepositContent}
                        setDepositStatus={setDepositStatus}
                        defaultValue={defaultValue}
                        closeModal={closeModal}
                        label={tokens}
                      />
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default withRouter(BaseDepositModal)

BaseDepositModal.propTypes = {
  defaultValue: PropTypes.string,
  closeModal: PropTypes.func,
}