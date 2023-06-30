import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container, Modal } from 'reactstrap';

import BaseDepositModal from '../BaseDepositModal/BaseDepositModal';

const DepositModal = ({ isOpen, closeHandler }) => {
  const {
    projectDetail: { slug = '', min_amount },
  } = useSelector((state) => state.Project);

  const defaultValue = min_amount ?? '200';

  return (
    <Modal className="postition-relative" isOpen={isOpen} toggle={closeHandler} centered>
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
      <Container fluid>
        {slug && <BaseDepositModal defaultValue={defaultValue} closeModal={closeHandler} />}
      </Container>
    </Modal>
  );
};

export default DepositModal;

DepositModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandler: PropTypes.func,
};
