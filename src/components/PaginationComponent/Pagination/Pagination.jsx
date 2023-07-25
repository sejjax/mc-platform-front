import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as Arrow } from 'assets/images/icons/arrow.svg';
import { ReactComponent as DoubleArrow } from 'assets/images/icons/duble-arrow.svg';
import classNames from 'classnames';

import s from './Pagination.module.scss';

const Pagination = ({ total, active, onPageChange }) => {
  const [displayedPages, setDisplayedPages] = useState([]);
  const maxButtons = 5;

  const handlePageChange = useCallback(
    (page) => {
      onPageChange((prev) => ({ ...prev, pageNumber: page }));
    },
    [onPageChange],
  );

  const handlePreviousClick = () => {
    if (active > 1) {
      handlePageChange(active - 1);
    }
  };

  const handleNextClick = () => {
    if (active < total) {
      handlePageChange(active + 1);
    }
  };

  const handleFirstPageClick = () => {
    if (active !== 1) {
      handlePageChange(1);
    }
  };

  const handleLastPageClick = () => {
    if (active !== total) {
      handlePageChange(total);
    }
  };

  const handlePageClick = (page) => {
    handlePageChange(page);
  };

  useEffect(() => {
    const totalPages = total;
    const newRangeStart = Math.max(1, active - Math.floor(maxButtons / 2));
    const newRangeEnd = Math.min(totalPages, newRangeStart + maxButtons - 1);
    const newDisplayedPages = Array.from(
      { length: newRangeEnd - newRangeStart + 1 },
      (_, index) => newRangeStart + index,
    );

    setDisplayedPages(newDisplayedPages);
  }, [active, total, maxButtons]);

  return (
    <div className={s.wrapper}>
      <div
        className={classNames(s.arrowWrap, { [s.disabled]: active === 1 })}
        onClick={handleFirstPageClick}>
        <DoubleArrow className={s.arrow} />
      </div>
      <div
        className={classNames(s.arrowWrap, { [s.disabled]: active === 1 })}
        onClick={handlePreviousClick}>
        <Arrow className={s.arrow} />
      </div>
      {displayedPages.map((pageNumber) => (
        <div
          key={pageNumber}
          className={classNames(s.item, pageNumber === active && s.active)}
          onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      ))}
      <div
        className={classNames(s.arrowWrap, { [s.disabled]: active === total })}
        onClick={handleNextClick}>
        <Arrow style={{ transform: 'rotate(180deg)' }} className={s.arrow} />
      </div>
      <div
        className={classNames(s.arrowWrap, { [s.disabled]: active === total })}
        onClick={handleLastPageClick}>
        <DoubleArrow style={{ transform: 'rotate(180deg)' }} className={s.arrow} />
      </div>
    </div>
  );
};

export default Pagination;
