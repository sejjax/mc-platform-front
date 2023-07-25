import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Row } from 'reactstrap';

const Table = forwardRef((props, ref) => {
  const { data, columns, keyField, custom } = props;

  if (!data) return null;

  return (
    <ToolkitProvider keyField={keyField} columns={columns} data={data}>
      {(toolkitProps) => (
        <Row>
          <Col xl="12">
            <BootstrapTable
              keyField="id"
              ref={ref}
              bootstrap4
              responsive
              striped={false}
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
