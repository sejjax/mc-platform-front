import React, { useEffect, useState } from 'react';

import { ReactComponent as Arrow } from 'assets/images/icons/arrow.svg';
import { ReactComponent as DoubleArrow } from 'assets/images/icons/duble-arrow.svg';
import moment from 'moment';
import ExternalDatePicker from 'react-datepicker';

import { subtractMonths } from '../../helpers/subtractMonths';

const DatePicker = ({ setFilterDate }) => {
  const [dateRange, setDateRange] = useState([subtractMonths(new Date(), 1), new Date()]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate && setFilterDate) {
      setFilterDate((prevState) => ({ ...prevState, startDate, endDate }));
    }
  }, [startDate, endDate, setFilterDate]);

  return (
    <ExternalDatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      className="picker-date"
      dateFormat="dd MMM yyyy"
      renderCustomHeader={({ date, decreaseYear, increaseYear, decreaseMonth, increaseMonth }) => {
        return (
          <div className="datepicker-wrapper">
            <div className="actions">
              <button onClick={decreaseYear} className="datepicker-button">
                <DoubleArrow className="arrow" size={16} />
              </button>
              <button onClick={decreaseMonth} className="datepicker-button">
                <Arrow className="arrow" />
              </button>
            </div>
            <div className="datepicker-header-date">{moment(date).format('MMMM YYYY')}</div>
            <div className="actions">
              <button onClick={increaseMonth} className="datepicker-button">
                <Arrow className="arrow" style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button onClick={increaseYear} className="datepicker-button">
                <DoubleArrow className="arrow" style={{ transform: 'rotate(180deg)' }} />
              </button>
            </div>
          </div>
        );
      }}
      showNextYearButton={true}
    />
  );
};

export default DatePicker;
