import React, { useEffect, useRef, useState } from 'react';

import { useWeb3Modal } from '@web3modal/react';
import useTranslation from 'hooks/useTranslation';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'reactstrap';
import { useAccount } from 'wagmi';

import { editDefaultWalletNumber } from 'store/actions';

const WalletConnectModal = () => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const dispatch = useDispatch();
  const isClosed = useRef(false);
  const { isAuth, defaultWalletAddress } = useSelector(
    (state) => ({
      isAuth: state.Profile.isAuth,
      defaultWalletAddress: state.Profile.user.default_wallet_address,
    }),
    shallowEqual,
  );

  const { open, isOpen: isWalletConnectModalOpened } = useWeb3Modal();

  useEffect(() => {
    if (isAuth && !defaultWalletAddress) {
      if (!isClosed.current) {
        setIsOpen(true);
      }
    }
    if (!isAuth && isClosed.current) isClosed.current = false;
    if (isAuth && defaultWalletAddress) setIsOpen(false);
  }, [isAuth, defaultWalletAddress]);

  useEffect(() => {
    if (!defaultWalletAddress && address && isAuth) dispatch(editDefaultWalletNumber(address));
  }, [address, defaultWalletAddress]);

  const closeHandler = () => {
    isClosed.current = true;
    setIsOpen(false);
  };

  return (
    <Modal
      className="position-relative"
      isOpen={isOpen && !isWalletConnectModalOpened}
      centered
      toggle={closeHandler}>
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
        <p className="fs-4">{t('wallet_connect_modal_no_default_wallet')}</p>
        <button className="btn btn-primary ms-2" onClick={open}>
          {t('common_connect_wallet')}
        </button>
      </div>
    </Modal>
  );
};

export default WalletConnectModal;
