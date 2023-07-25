import React, { useEffect, useState } from 'react';

import ExternalDatePicker from 'react-datepicker';

import { subtractMonths } from '../../helpers/subtractMonths';

const DatePicker = ({ setFilterDate }) => {
  const [dateRange, setDateRange] = useState([subtractMonths(new Date(), 10), new Date()]);
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
    />
  );
};

export default DatePicker;
