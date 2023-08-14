import React from 'react';

import moment from 'moment';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import s from './AnalyzeChart.module.scss';

const AnalyzeChart = ({ data }) => {
  const chartData = data?.map((item) => ({
    inInvesting: item.inInvesting,
    payed: item.payed,
    name: moment(item.date).format('DD.MM.YYYY'),
  }));

  return (
    <div className={s.wrapper}>
      <ResponsiveContainer className={s.chart}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="inInvesting" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="payed" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyzeChart;
