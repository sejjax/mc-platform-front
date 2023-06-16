import {
  addHeaderFormatterToTableColumns,
  headerFormatterCenteredTitle,
} from "helpers/table_helper"
import React from "react"

export const columns = addHeaderFormatterToTableColumns(
  [
    {
      dataField: "date",
      text: "Дата",
      sort: true,
      attrs: {
        "data-label": "Дата",
      },
      formatter: row => {
        const date = new Date(row)
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      dataField: "product",
      text: "Продукт",
      sort: true,
      attrs: {
        "data-label": "Продукт",
      },
    },
    {
      dataField: "currency_amount",
      text: "Количество",
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === "asc") {
          return a - b
        }
        return b - a
      },
      attrs: {
        "data-label": "Количество",
      },
      formatter: row => {
        const roundedValue = Math.ceil(+row * 1000) / 1000
        return <div>{roundedValue}</div>
      },
    },
    {
      dataField: "apy",
      text: "Годовой процент",
      sort: true,
      attrs: {
        "data-label": "Годовой процент",
      },
      formatter: row => {
        return <div>{row}%</div>
      },
    },
    {
      dataField: "investment_period",
      sort: true,
      text: "Период инвестирования",
      attrs: {
        "data-label": "Период инвестирования",
      },
    },
    {
      dataField: "payment_period",
      sort: true,
      text: "Периодичность выплат",
      attrs: {
        "data-label": "Периодичность выплат",
      },
    },
    {
      dataField: "earn_amount",
      text: "Сумма к получению",
      sort: true,
      attrs: {
        "data-label": "Сумма к получению",
      },
      formatter: row => {
        const roundedValue = Math.ceil(row * 1000) / 1000
        return <div>{roundedValue}</div>
      },
      sortFunc: (a, b, order) => {
        if (order === "asc") {
          return a - b
        }
        return b - a
      },
    },
    {
      attrs: {
        "data-label": "Адрес кошелька",
      },
      sort: true,
      dataField: "wallet_addr",
      text: "Адрес кошелька",
      classes: "wallet__addr_col",
    },
  ],
  headerFormatterCenteredTitle
)
