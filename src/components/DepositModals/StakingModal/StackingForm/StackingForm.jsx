import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import useWallet from 'hooks/useWallet';
import PropTypes from 'prop-types';
import { Form, FormFeedback, Input, InputGroup, Label } from 'reactstrap';
import * as yup from 'yup';

const StackingForm = ({ label }) => {
  const { createWalletConnect, tokenContract, walletNumber, walletProvider, web3 } = useWallet();

  const validation = useFormik({
    initialValues: {
      [label]: '',
    },
    validationSchema: yup.object({
      [label]: yup.string().required(),
    }),
    onSubmit: async (values) => {
      const tokenValue = web3.utils.toWei(values[label].toString());
      const a = await tokenContract.methods
        .transfer('0xFA6572eb4cc7d45e80F1760a7d3AAD3bb2B1Bf67', tokenValue)
        .send({ from: walletNumber });
    },
  });

  useEffect(() => {
    createWalletConnect();
  }, []);

  return (
    <div className="form-horizontal">
      <div className="mt-4">
        <div className="d-flex align-items-strech">
          <div
            style={{
              width: '86px',
              borderRadius: '0.25rem 0 0 0.25rem',
              borderRight: 'none',
            }}
            className="input-group-text d-flex justify-content-center">
            BUSD
          </div>
          <Input
            type="number"
            name={label}
            value={validation.values[label]}
            onChange={validation.handleChange}
            invalid={validation.touched[label] && validation.errors[label] ? true : false}
            placeholder="Введите количество монет"
            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
          />
        </div>

        {validation.touched[label] && validation.errors[label] ? (
          <FormFeedback type="invalid">{validation.errors[label]}</FormFeedback>
        ) : null}
      </div>
      <div className="mt-5 d-flex">
        <button
          className="btn btn-success"
          disabled={!walletNumber}
          onClick={(e) => {
            e.preventDefault();
            validation.submitForm();
          }}>
          Внести средства
        </button>
        {!walletNumber && (
          <button
            className="btn btn-primary ms-2"
            onClick={async () => {
              try {
                await walletProvider.enable();
              } catch (error) {
                createWalletConnect();
              }
            }}>
            Подключить кошелек
          </button>
        )}
        {walletNumber && (
          <button
            className="btn btn-danger ms-2"
            onClick={() => {
              walletProvider.disconnect();
            }}>
            Отключить кошелек
          </button>
        )}
      </div>
      {walletNumber && <div className="mt-3">Подключенный кошелек: {walletNumber}</div>}
    </div>
  );
};

export default StackingForm;

StackingForm.propTypes = {
  label: PropTypes.string,
};
