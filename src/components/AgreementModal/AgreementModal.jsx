import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useWeb3Modal } from '@web3modal/react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'reactstrap';

import userService from 'services/userService';
import { setAgreement } from 'store/actions';

const AgreementModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isOpen: isWalletModalOpened } = useWeb3Modal();
  const agreement = useSelector((state) => state.Profile.user?.agreement ?? null);

  const submitHandler = (value) => async () => {
    await userService.setAgreement(value);
    dispatch(setAgreement(value));
    setIsOpen(false);
  };

  useEffect(() => {
    if (agreement === 2 && !isWalletModalOpened) {
      setIsOpen(true);
    }
    if (isOpen && isWalletModalOpened) setIsOpen(false);
  }, [isWalletModalOpened, agreement]);

  return (
    <Modal isOpen={isOpen} centered className={`${!isOpen ? 'd-none' : ''}`}>
      <div className="p-4 text-center">
        <h5>Согласны ли вы показывать свой номер телефона вышестоящем руководителям?</h5>
        <div className="d-flex gap-2 justify-content-center mt-4">
          <Button color="danger" className="px-k" onClick={submitHandler(0)}>
            Нет
          </Button>
          <Button color="primary" className="px-4" onClick={submitHandler(1)}>
            Да
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AgreementModal;
