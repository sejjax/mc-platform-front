import React from "react"
import PropTypes from "prop-types"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import { Col, Row } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import { pageOptions } from "../../pages/Metrics/MetricsContstants"

const Table = ({ data, columns, custom, customPaginationProps }) => {
  return (
    <>
      <PaginationProvider
        pagination={paginationFactory({
          ...pageOptions,
          ...customPaginationProps,
          totalSize: data.length,
        })}
        data={data}
        columns={columns}
      >
        {({ paginationProps, paginationTableProps }) => {
          return (
            <>
              <Row>
                <Col>
                  <BootstrapTable
                    bootstrap4
                    data={data}
                    columns={columns}
                    keyField="id"
                    {...paginationTableProps}
                    {...custom}
                  />
                </Col>
              </Row>
              <Row className="mt-30">
                <Col
                  className="inner-custom-pagination d-flex"
                  style={{
                    justifyContent: "space-between",
                    gap: "10px",
                    flexWrap: "wrap",
                    paddingTop: "10px",
                    borderTop: "1px solid #EFF2F7",
                  }}
                >
                  <div className="d-inline">
                    <SizePerPageDropdownStandalone {...paginationProps} />
                  </div>
                  <div>
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                </Col>
              </Row>
            </>
          )
        }}
      </PaginationProvider>
    </>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  custom: PropTypes.object,
  customPaginationProps: PropTypes.object,
}

export default Table
