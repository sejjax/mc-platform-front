import PropTypes from 'prop-types';

const OptionsChart = ({ apyChanging }) => {
  const options = {
    chart: {
      height: 290,
      type: 'area',
      toolbar: {
        show: !1,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '14%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: !1,
    },
    grid: {
      yaxis: {
        lines: {
          show: !1,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: apyChanging.map((apy) => apy?.date),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '%';
        },
      },
    },
    x: {
      format: 'MM',
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toFixed(0) + '%';
        },
      },
    },
    colors: ['#556ee6'],
  };

  const series = [
    {
      name: 'APY Changing',
      data: apyChanging.map((apy) => apy?.value),
    },
  ];

  return {
    options,
    series,
  };
};

OptionsChart.propTypes = {
  apyChanging: PropTypes.array,
};

export default OptionsChart;
