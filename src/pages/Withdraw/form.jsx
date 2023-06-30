import React, { useCallback, useState } from 'react';

import { useFormik } from 'formik';
import { Col, Form, FormFeedback, Input, InputGroup, Label, Row } from 'reactstrap';
import * as yup from 'yup';

import CurrencyCard from 'pages/Deposit/currencyCard';

import BNDIcon from '../../assets/images/icons/BNB.svg';
import BUSDIcon from '../../assets/images/icons/BUSD.svg';
import { t } from '../../i18n';

const WithdrawFrom = () => {
  const [tokens, setTokens] = useState('BNB');

  const changeTokenHandler = (token) => {
    setTokens(token);
  };

  const callback = useCallback(
    (token) => {
      changeTokenHandler(token);
    },
    [tokens],
  );

  const validation = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: yup.object({
      amount: yup.number().min(100, 'Должно быть больше 100'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form>
      <Col sm={8}>
        <div>
          <Label htmlFor="amount">{t('withdrawal_amount')}</Label>
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
            <FormFeedback type="invalid">{validation.errors.amount}</FormFeedback>
          ) : null}
        </div>
      </Col>
      <Row className="mt-5">
        <p>{t('common_currency')}</p>
        <Col sm={5}>
          <CurrencyCard
            title="BUSD"
            description="Binance Smart Chain"
            icon={BUSDIcon}
            currentPrice="1 BUSD = $ 1"
            onClick={callback}
            isActive={'BUSD' === tokens}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <p>{t('withdrawals_you_will_get')}</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <img
            src={tokens === 'BND' ? BNDIcon : BUSDIcon}
            style={{
              width: '30px',
              marginRight: '20px',
            }}
          />
          <div className="font-size-24 font-weight-600">
            {'5'} {tokens}
          </div>
        </div>
      </Row>
      <Row className="mt-5">
        <Col sm={4}>
          <button style={{ width: '100%' }} className="btn btn-success btn-block">
            {t('common_withdraw')}
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default WithdrawFrom;
