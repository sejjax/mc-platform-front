import React, { useEffect, useState } from 'react';

import PageSizeDropdown from './PageSizeDropdown';
import Pagination from './Pagination';
import s from './PaginationComponent.module.scss';

const PaginationComponent = ({ active, total, setPagination }) => {
  const [size, setSize] = useState(25);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNumber: 1, size }));
  }, [setPagination, size]);

  return (
    <div className={s.wrapper}>
      <PageSizeDropdown currentSize={size} setCurrentSize={setSize} />
      <Pagination total={total} active={active} onPageChange={setPagination} />
    </div>
  );
};

export default PaginationComponent;
