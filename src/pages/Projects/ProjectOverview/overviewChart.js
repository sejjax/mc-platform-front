import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { t } from '../../../i18n';
import OptionsChart from './optionsChart';

const OverviewChart = ({ apyChanging }) => {
  const { options, series } = useMemo(
    () =>
      OptionsChart({
        apyChanging: Array.isArray(apyChanging) ? apyChanging : [],
      }),
    [apyChanging],
  );

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">{t('project_change_yearly_profit')}</CardTitle>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="290"
          className="apex-charts"
        />
      </CardBody>
    </Card>
  );
};

OverviewChart.propTypes = {
  apyChanging: PropTypes.array,
};

export default OverviewChart;
