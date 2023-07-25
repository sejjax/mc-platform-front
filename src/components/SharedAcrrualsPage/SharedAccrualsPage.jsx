import React, { useEffect, useState } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import BootstrapTable from 'react-bootstrap-table-next';
import { Card, CardBody } from 'reactstrap';

import AccrualsPageFilter from '../AccrualsPageFilter';
import PaginationComponent from '../PaginationComponent';

const DepositAccruals = ({
  items,
  totalPages,
  columns,
  displayedKeyNames,
  isPassiveAccruals,
  setIsPassiveAccruals,
  setFilter,
  filter,
  accrualsType,
  setSort,
}) => {
  return (
    <Card>
      <CardBody>
        <AccrualsPageFilter
          setIsPassiveAccruals={setIsPassiveAccruals}
          accrualsType={accrualsType}
          isPassiveAccruals={isPassiveAccruals}
          setFilter={setFilter}
          items={items}
          displayedKeyNames={displayedKeyNames}
          setSort={setSort}
        />
        <BootstrapTable
          keyField="id"
          data={items}
          columns={columns}
          headerClasses="table-head"
          wrapperClasses="table-responsive"
          classes="table__adaptive_bordered_between text-center"
          responsive
        />
        <PaginationComponent
          active={filter?.pageNumber}
          setPagination={setFilter}
          total={totalPages}
        />
      </CardBody>
    </Card>
  );
};

export default withForbiddenWithoutBuyingPackage(DepositAccruals);
