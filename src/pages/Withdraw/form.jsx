import React, { useState, useCallback } from "react"
import {
  Col,
  Form,
  Input,
  InputGroup,
  Label,
  FormFeedback,
  Row,
} from "reactstrap"

import { useFormik } from "formik"
import * as yup from "yup"

import CurrencyCard from "pages/Deposit/currencyCard"
import BUSDIcon from "../../assets/images/icons/BUSD.svg"
import BNDIcon from "../../assets/images/icons/BNB.svg"

const WithdrawFrom = () => {
  const [tokens, setTokens] = useState("BNB")

  const changeTokenHandler = token => {
    setTokens(token)
  }

  const callback = useCallback(
    token => {
      changeTokenHandler(token)
    },
    [tokens]
  )

  const validation = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: yup.object({
      amount: yup.number().min(100, "Должно быть больше 100"),
    }),
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <Form>
      <Col sm={8}>
        <div>
          <Label htmlFor="amount">Сумма вывода</Label>
          <InputGroup>
            <div className="input-group-text">BUSD</div>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={validation.values.amount || 0}
              onChange={validation.handleChange}
            />
          </InputGroup>
          {validation.touched.amount && validation.errors.amount ? (
            <FormFeedback type="invalid">
              {validation.errors.amount}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Row className="mt-5">
        <p>Валюта</p>
        <Col sm={5}>
          <CurrencyCard
            title="BUSD"
            description="Binance Smart Chain"
            icon={BUSDIcon}
            currentPrice="1 BUSD = $ 1"
            onClick={callback}
            isActive={"BUSD" === tokens}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <p>Вы получите</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={tokens === "BND" ? BNDIcon : BUSDIcon}
            style={{
              width: "30px",
              marginRight: "20px",
            }}
          />
          <div className="font-size-24 font-weight-600">
            {"5"} {tokens}
          </div>
        </div>
      </Row>
      <Row className="mt-5">
        <Col sm={4}>
          <button
            style={{ width: "100%" }}
            className="btn btn-success btn-block"
          >
            Вывести
          </button>
        </Col>
      </Row>
    </Form>
  )
}

export default WithdrawFrom
