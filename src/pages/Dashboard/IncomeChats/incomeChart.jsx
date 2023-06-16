import React from "react"
import PropTypes from "prop-types"

import {
  PieChart,
  Legend,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
  Sector,
} from "recharts"

import "./styles.scss"

import * as S from "./styled"
import { useState } from "react"

const renderActiveShape = props => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

const renderTooltip = props => {
  const { active, payload, label } = props

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          position: "relative",
          zIndex: "1000",
          visibility: "visible",
        }}
      >
        {label}
      </div>
    )
  }

  return null
}

const renderedLabel = props => {
  const {
    viewBox: { cx, cy },
  } = props
  const textProps = {
    x: cx,
    y: cy - 10,
    textAnchor: "middle",
    verticalanchor: "middle",
    fill: "#495057",
  }

  const valueProps = {
    x: cx,
    y: cy + 20,
    textAnchor: "middle",
    verticalanchor: "middle",
    fill: "black",
    fontSize: "15",
  }

  return (
    <>
      <text {...textProps}>Общая сумма</text>
      <text {...valueProps}>${+props.value.toFixed(2)}</text>
    </>
  )
}

const renderedLegend = (props, additionChartInfo) => {
  const { payload } = props

  const { partners, product } = additionChartInfo

  if (!Array.isArray(payload)) {
    return
  }

  const partnersIncome = payload.filter(el => el.payload.key === "fromPartners")
  const financialProductIncome = payload.filter(
    el => el.payload.key === "fromFinancialProducts"
  )

  return (
    <S.Wrapper className="income__legend_wrapper">
      <div>
        <S.LegendGrid mb className="legend__grid">
          <span>
            От партнеров <S.Present>{partners.percent}%</S.Present>{" "}
          </span>
          <span>$ {partners.total}</span>
        </S.LegendGrid>
        <S.LegendGrid className="legend__grid">
          {partnersIncome.map(el => (
            <React.Fragment key={el.value}>
              <div>
                <S.ListMarker bgColor={el.color}>{el.value}</S.ListMarker>
                <S.Present> {el.payload.percent}%</S.Present>
              </div>
              <div>$ {el.payload.value}</div>
            </React.Fragment>
          ))}
        </S.LegendGrid>
      </div>
      <div>
        <S.LegendGrid mb className="legend__grid">
          <span>
            От финансовых продуктов
            <S.Present>{product.percent}%</S.Present>
          </span>
          <span>$ {product.total}</span>
        </S.LegendGrid>
        <S.LegendGrid className="legend__grid">
          {financialProductIncome.map(el => (
            <React.Fragment key={el.value}>
              <div>
                <S.ListMarker bgColor={el.color}>{el.value}</S.ListMarker>
                <S.Present> {el.payload.percent}%</S.Present>
              </div>
              <div>$ {el.payload.value}</div>
            </React.Fragment>
          ))}
        </S.LegendGrid>
      </div>
    </S.Wrapper>
  )
}

const IncomeChart = ({ chartData, totalData }) => {
  const COLORS = [
    "#8543E0",
    "#3BA0FF",
    "#FA8C16",
    "#36CBCB",
    "#4DCB73",
    "#FAD337",
    "#3353F4",
    "#EB2F96",
    "#F04864",
  ]

  const { product, partners, total } = totalData

  const additionCharInfo = {
    product: {
      total: product.total,
      percent: product.percent,
    },
    partners: {
      total: partners.total,
      percent: partners.percent,
    },
  }

  const [activeCell, setActiveCell] = useState(null)

  const onCellEnter = (_, index) => {
    setActiveCell(index)
  }

  return (
    <div
      className="chart__wrapper"
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        zIndex: "100",
      }}
    >
      <ResponsiveContainer width={280} height={250}>
        <PieChart width={200} height={250}>
          <Pie
            activeIndex={activeCell}
            data={chartData}
            outerRadius={80}
            innerRadius={60}
            paddingAngle={1}
            dataKey={"value"}
            cy={100}
            cx={100}
            activeShape={renderActiveShape}
            // onMouseEnter={onCellEnter}
            // onMouseDown={() => setActiveCell(null)}
          >
            {chartData.map((entry, index) => {
              return (
                <Cell
                  className="some"
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              )
            })}
            <Label value={total} position="center" content={renderedLabel} />
          </Pie>
          <Legend
            content={props => renderedLegend(props, additionCharInfo)}
            wrapperStyle={{
              position: "absolute",
              top: "40%",
              left: "0",
              right: "0",
              width: "100% !important",
              zIndex: "0",
            }}
          />
          {/* <Tooltip /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

IncomeChart.propTypes = {
  chartData: PropTypes.array,
  totalData: PropTypes.shape({
    total: PropTypes.number,
    product: PropTypes.shape({
      percent: PropTypes.number,
      total: PropTypes.number,
    }),
    partners: PropTypes.shape({
      percent: PropTypes.number,
      total: PropTypes.number,
    }),
  }),
}

export default IncomeChart
