import React, { useState } from 'react';

import { API_URL, post } from 'helpers/api_helper';
import { Trans } from 'react-i18next';
import { Button, Modal } from 'reactstrap';

import { t } from '../../../../i18n';

const ConfirmChangeDefaultWalletModal = ({ isOpen, wallet, closeModal }) => {
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const changeDefaultWallet = async () => {
    const response = await post(`${API_URL}/change-default-wallet-addr`, {
      new_wallet: wallet,
    });
    if (response.status === 201) return setConfirm(true);
    setError(true);
  };

  const closeHandler = () => {
    setError(null);
    setConfirm(false);
    closeModal();
  };
  return (
    <Modal centered isOpen={isOpen} toggle={closeHandler}>
      <span
        onClick={closeHandler}
        className="position-absolute p-8 bg-white rounded-circle d-flex justify-content-center align-items-center w-20 h-20"
        style={{
          cursor: 'pointer',
          zIndex: '1000',
          top: '-12px',
          right: '-12px',
          width: '25px',
          height: '25px',
          fontSize: '20px',
        }}>
        x
      </span>
      <div className="p-4 text-center">
        {!confirm && (
          <>
            <p>
              <Trans
                i18nKey="change_wallet_modal_hint"
                components={{ b: <span /> }}
                values={{ wallet: wallet }}
              />
            </p>

            <div>
              <Button color="success" onClick={changeDefaultWallet}>
                {t('common_yes')}
              </Button>
              <Button className="ms-2" color="danger" onClick={closeHandler}>
                {t('common_no')}
              </Button>
            </div>
          </>
        )}
        {confirm && <h5>{t('change_wallet_modal_confirm_operation')}</h5>}
        {error && <p>{t('change_wallet_modal_operation_error')}</p>}
      </div>
    </Modal>
  );
};

export default ConfirmChangeDefaultWalletModal;
