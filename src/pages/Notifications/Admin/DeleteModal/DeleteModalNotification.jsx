import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';

import { deleteNotification } from 'store/actions';

import { t } from '../../../../i18n';
import './DeleteModalNotification.scss';

const DeleteModalNotification = ({
  deleteNotification,
  closeModal,
  getSelectedItem,
  selectedItemId,
  isOpen,
}) => {
  const selectedItem = getSelectedItem(selectedItemId);
  const deleteNotificationHandler = () => {
    deleteNotification({ id: selectedItemId });
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} toggle={closeModal} centered>
      <ModalBody className="notifications__modal_delete_body">
        {selectedItem && (
          <div>
            {t('notification_delete_notification')} <br />
            <span>{selectedItem.notification_title}</span>?
          </div>
        )}
        <div className="notifications__modal_delete_btns">
          <Button color="primary" onClick={closeModal}>
            {t('common_cansel')}
          </Button>
          <Button color="danger" onClick={deleteNotificationHandler}>
            {t('common_delete')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModalNotification.propTypes = {
  closeModal: PropTypes.func,
  submitHandler: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedItemId: PropTypes.number,
  deleteNotification: PropTypes.func,
  getSelectedItem: PropTypes.func,
};
const mapStateToProps = (state) => ({
  getSelectedItem: (id) => state.Notifications.notifications.find((item) => item.id === id),
});

const mapDispatchToProps = (dispatch) => ({
  deleteNotification: (id) => dispatch(deleteNotification(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModalNotification);
