import React from 'react';
import { forwardRef } from 'react';

import PropTypes from 'prop-types';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Row } from 'reactstrap';

export const defaultSorted = [
  {
    dataField: 'id',
    order: 'asc',
  },
];
export const getOptions = () => {
  return {
    paginationSize: 10,
    pageStartIndex: 1,
    alwaysShowAllBtns: true,
    hidePageListOnlyOnePage: false,
    hideSizePerPage: false,
    sizePerPage: 100,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '25',
        value: 25,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
    ],
  };
};

const Table = forwardRef((props, ref) => {
  const { data, columns, keyField, custom } = props;

  if (!data) return null;

  return (
    <ToolkitProvider keyField={keyField} columns={columns} data={data} search>
      {(toolkitProps) => (
        <Row>
          <Col xl="12">
            <BootstrapTable
              keyField="id"
              ref={ref}
              bootstrap4
              responsive
              striped={false}
              defaultSorted={defaultSorted}
              pagination={paginationFactory(getOptions())}
              classes={'table table-bordered th__pointer table__adaptive_bordered_between'}
              headerWrapperClasses={'thead-light table-head'}
              {...toolkitProps.baseProps}
              {...custom}
            />
          </Col>
        </Row>
      )}
    </ToolkitProvider>
  );
});

Table.displayName = 'Table';

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  custom: PropTypes.object,
  customPaginationProps: PropTypes.object,
  keyField: PropTypes.string,
};

export default Table;
