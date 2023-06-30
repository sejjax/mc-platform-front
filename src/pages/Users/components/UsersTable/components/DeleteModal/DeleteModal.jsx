import React from 'react';

import PropTypes from 'prop-types';
import { Button, Modal } from 'reactstrap';

const DeleteModal = ({ data, activeHandler }) => {
  const toggleHandler = () => {
    activeHandler({ active: false, username: '', rights: [] });
  };
  return (
    <Modal isOpen={data.active} toggle={toggleHandler} centered style={{ maxWidth: '300px' }}>
      <div className="users__delete_modal_wrapper">
        <div className="title">
          Confirm delete rights{' '}
          <div>
            Username: <span>{data.username}</span>
          </div>
          <div>
            Permissions: <span>{data.permissions}</span>
          </div>
        </div>
        <div className="users__delete_modal_btns">
          <Button color="primary">Confirm</Button>
          <Button onClick={toggleHandler}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {
  data: PropTypes.any,
  activeHandler: PropTypes.func,
};

export default DeleteModal;
