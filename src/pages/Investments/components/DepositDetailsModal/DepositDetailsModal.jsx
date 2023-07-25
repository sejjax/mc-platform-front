import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal } from 'reactstrap';

import { fetchAccurals } from 'services/accrualsService';

import useTranslation from '../../../../hooks/useTranslation';
import { columns } from '../../../DepositAccruals/columns';
import s from './DepositDetailsModal.module.scss';

const DepositDetailsModal = ({ isOpenId, setIsOpenId }) => {
  const t = useTranslation();
  const [items, setItems] = useState([]);

  const handleClose = useCallback(() => {
    setItems([]);
    setIsOpenId('');
  }, []);

  const getDepositDetails = useCallback(async () => {
    const res = await fetchAccurals({
      type: 'deposit',
      filters: JSON.stringify({
        productId: Number(isOpenId.match(/-(.+)/)[1]),
      }),
    });

    if (!!res.totalItemsCount) {
      setItems(res.items);
    } else {
      setItems([]);
    }
  }, [isOpenId]);

  useEffect(() => {
    if (isOpenId) {
      getDepositDetails();
    }
  }, [getDepositDetails, isOpenId]);

  return (
    <Modal
      isOpen={!!isOpenId}
      centered
      className={classNames(!isOpenId && 'd-none')}
      toggle={handleClose}
      size="xl">
      <div className={s.wrapper}>
        {!!items && (
          <BootstrapTable
            keyField="id"
            data={items}
            columns={columns(t, () => {})}
            headerClasses="table-head"
            wrapperClasses="table-responsive"
            classes="table__adaptive_bordered_between text-center"
            responsive
          />
        )}
      </div>
    </Modal>
  );
};

export default DepositDetailsModal;
