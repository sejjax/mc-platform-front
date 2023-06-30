import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

import BNDIcon from '../../assets/images/icons/BNB.svg';
import BUSDIcon from '../../assets/images/icons/BUSD.svg';

const amountFormatter = (row, cell) => {
  const amount = row.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  if (amount.split('.')[1] === '00') {
    return (
      <span>
        {'$ '}
        {amount.split('.')[0]}
      </span>
    );
  }

  return (
    <span>
      {'$ '}
      {amount}
    </span>
  );
};

const currencyFormatter = (row, cell) => {
  const currency = row.split(' ')[1];

  return (
    <div
      style={{
        display: 'flex',
      }}>
      <img
        src={currency === 'BNB' ? BNDIcon : BUSDIcon}
        style={{ width: '20px', marginRight: '10px' }}
      />
      <span className="font-weight-600">{row}</span>
    </div>
  );
};

// const pageButtonRenderer = ({
//   page,
//   active,
//   disabled,
//   title,
//   onPageChange
// }) => {
//   const handleClick = (e) => {
//     e.preventDefault();
//     onPageChange(page);
//   };

//   return (
//     <div>{page}</div>
//   );
// };

const HistoryTable = ({ withdrawalsHistory }) => {
  let pageOptions = {
    sizePerPage: 50,
    totalSize: withdrawalsHistory.length,
    custom: true,
    // pageButtonRenderer,
    sizePerPageList: [
      {
        text: '50',
        value: 50,
      },
      {
        text: '25',
        value: 25,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: 'All',
        value: withdrawalsHistory.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'date',
      text: 'Date',
      sort: false,
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: false,
      formatter: amountFormatter,
    },
    {
      dataField: 'currency',
      text: 'Currency',
      sort: false,
      formatter: currencyFormatter,
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle>{t('withdrawals_history_title')}</CardTitle>
        <PaginationProvider
          pagination={paginationFactory(pageOptions)}
          keyField="date"
          data={withdrawalsHistory}
          columns={columns}>
          {({ paginationProps, paginationTableProps }) => (
            <>
              <Row
                style={{
                  maxHeight: '700px',
                  overflowY: 'scroll',
                }}>
                <Col>
                  <BootstrapTable
                    bootstrap4
                    keyField="date"
                    data={withdrawalsHistory}
                    columns={columns}
                    {...paginationTableProps}
                  />
                </Col>
              </Row>
              <Row className="mt-30">
                <Col
                  className="inner-custom-pagination d-flex"
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    borderTop: '1px solid #EFF2F7',
                  }}>
                  <div className="d-inline">
                    <SizePerPageDropdownStandalone {...paginationProps} />
                  </div>
                  <div>
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                </Col>
              </Row>
            </>
          )}
        </PaginationProvider>
      </CardBody>
    </Card>
  );
};

export default HistoryTable;

HistoryTable.propTypes = {
  withdrawalsHistory: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      amount: PropTypes.number,
      currency: PropTypes.string,
    }),
  ).isRequired,
};
