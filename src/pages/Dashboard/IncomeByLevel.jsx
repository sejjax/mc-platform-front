import moment from "moment"
import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Card, CardBody, CardTitle, Row } from "reactstrap"

import "./sass/notification.scss"
import "./sass/incomebyLevel.scss"

import { getIncome } from "store/actions"
import IncomeChart from "./IncomeChats/incomeChart"

const structureLines = {
  1: "Первая линия",
  2: "Остальные линии",
}

const IncomeByLevel = ({ income, onGetIncome }) => {
  const data = React.useMemo(() => {
    const partners = Object.values(income?.partners ?? {})
    const { basic = 0, investor = 0, investorPro = 0 } = income?.products ?? {}
    const totalProducts = +basic + +investor + +investorPro
    const totalPartners = partners.reduce((acc, curr) => acc + +curr, 0)
    const total = totalProducts + totalPartners

    const perc = (a, b) => (b === 0 ? 0 : Math.round((a / b) * 100))
    const round = x => +(+x).toFixed(2)

    return {
      total,
      partners: {
        totalPercent: perc(totalPartners, total),
        total: round(totalPartners),
        partners: partners.map((value, index) => ({
          id: index + 1,
          income: round(value),
          percent: perc(value, total),
        })),
      },
      products: {
        totalPercent: perc(totalProducts, total),
        total: round(totalProducts),
        products: [
          {
            name: "Базовый пакет",
            income: round(basic),
            percent: perc(basic, total),
          },
          {
            name: "Инвестор",
            income: round(investor),
            percent: perc(investor, total),
          },
          {
            name: "Инвестор ПРО",
            income: round(investorPro),
            percent: perc(investorPro, total),
          },
        ],
      },
    }
  }, [income])

  const { products, partners } = data

  const [selectedMonth, setSelectedMont] = useState(new Date().getMonth())

  React.useEffect(() => {
    onGetIncome?.()
  }, [selectedMonth, onGetIncome])

  let chartData, totalData

  if (products && partners) {
    chartData = [
      ...partners.partners.map(el => ({
        value: el.income,
        name: structureLines[el.id],
        key: "fromPartners",
        percent: el.percent,
      })),
      ...products.products.map(el => ({
        value: el.income,
        name: el.name,
        key: "fromFinancialProducts",
        percent: el.percent,
      })),
    ]
    totalData = {
      total: data.total,
      product: {
        total: data.products.total,
        percent: data.products.totalPercent,
      },
      partners: {
        total: data.partners.total,
        percent: data.partners.totalPercent,
      },
    }
  }

  return (
    <Card className="same-height income__wrapper">
      <CardTitle>
        <div className="title">
          <h4 className="font-size-15">Ваши доходы на проекте</h4>
        </div>
      </CardTitle>
      <CardBody className="income__body_wrapper">
        <Row>
          {chartData && (
            <IncomeChart chartData={chartData} totalData={totalData} />
          )}
        </Row>
      </CardBody>
    </Card>
  )
}

IncomeByLevel.propTypes = {
  income: PropTypes.any,
  onGetIncome: PropTypes.func,
}

const mapStateToProps = state => ({
  income: state.Dashboard.income,
})

const mapDispatchToProps = dispatch => ({
  onGetIncome: () => dispatch(getIncome()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IncomeByLevel)
