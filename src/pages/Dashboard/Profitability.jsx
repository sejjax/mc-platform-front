import React, { useState } from 'react';

import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import useTranslation from '../../hooks/useTranslation';
import './sass/notification.scss';

const Profitability = ({ chartsData }) => {
  const t = useTranslation();
  const series = [
    {
      name: 'MC',
      data: chartsData,
    },
  ];

  const [dateMonthInterval, setDateMonthInterval] = useState(6);

  const chartsDataDates = (() => {
    const result = {
      min: null,
      max: null,
    };
    const todayDate = new Date();
    const minusHalfYear = new Date().setMonth(todayDate.getMonth() - dateMonthInterval);

    const plusHalfYear = new Date().setMonth(todayDate.getMonth() + dateMonthInterval);
    result.min = minusHalfYear;
    result.max = plusHalfYear;
    return result;
  })();
  const options = {
    chart: { toolbar: 'false' },
    dataLabels: { enabled: !1 },
    stroke: { curve: 'smooth', width: 2 },
    markers: { size: 0, style: 'hollow' },
    xaxis: {
      type: 'datetime',
      min: chartsDataDates.min,
      max: chartsDataDates.max,
    },
    tooltip: { x: { format: 'MMM yyyy' } },
    colors: ['#f1b44c'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [42, 100, 100, 100],
      },
    },
  };

  const changeChartsMonthDisplayHandler = (interval) => {
    setDateMonthInterval(interval);
  };

  return (
    <Card className="p-3 same-height">
      <CardTitle>
        <h4 className="font-size-15">{t('dashboard_profitability_title')}</h4>
      </CardTitle>
      <CardBody>
        <div className="h-100">
          {chartsData?.length === 0 && (
            <div className="text-center d-flex justify-content-center align-items-center h-100">
              {t('dashboard_profitability_chart_text')}
            </div>
          )}
          {chartsData?.length !== 0 && (
            <div id="overview-chart" className="apex-charts" dir="ltr">
              <div className="toolbar d-flex flex-wrap gap-2 justify-content-center">
                <Button
                  color="light"
                  size="sm"
                  type="button"
                  className={dateMonthInterval === 3 ? 'active' : ''}
                  onClick={() => changeChartsMonthDisplayHandler(3)}
                  id="six_months">
                  6M
                </Button>
                <Button
                  color="light"
                  size="sm"
                  type="button"
                  className={dateMonthInterval === 6 ? 'active' : ''}
                  onClick={() => changeChartsMonthDisplayHandler(6)}
                  id="one_year">
                  1Y
                </Button>
              </div>
              <div id="overview-chart-timeline">
                <ReactApexChart options={options} series={series} type="area" height={240} />
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

Profitability.propTypes = {
  chartsData: PropTypes.any,
};

const mapStateToProps = (state) => {
  const chartsData = state.Dashboard?.income?.chartsData ?? [];
  return { chartsData };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profitability);
