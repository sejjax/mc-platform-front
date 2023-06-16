import React, {useMemo} from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import OptionsChart from "./optionsChart";

const OverviewChart = ({ apyChanging }) => {
  const {options, series} = useMemo(() => OptionsChart({
    apyChanging: Array.isArray(apyChanging) ? apyChanging : []
  }), [apyChanging])

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Изменение годовой доходности</CardTitle>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="290"
          className="apex-charts"
        />
      </CardBody>
    </Card>
  )
}

OverviewChart.propTypes = {
  apyChanging: PropTypes.array,
}

export default OverviewChart
