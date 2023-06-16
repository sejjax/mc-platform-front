/* eslint-disable react-hooks/rules-of-hooks */
import ShortWallet from "components/SharedAcrrualsPage/components/ShortWallet"
import {
  addHeaderFormatterToTableColumns,
  headerFormatterCenteredTitle,
} from "helpers/table_helper"
import React from "react"

export const DISPLAYED_KEY_NAMES = {
  payment_date: "Дата",
  referralFullName: "Имя партнера",
  referralPartnerId: "ID партнера",
  wallet_addr: "Адрес кошелька",
  amount: "Количество",
  percent: "Процент",
  accrual_type: "Тип",
  product: "Продукт",
  status: "Статус",
}

export const columns = addHeaderFormatterToTableColumns(
  [
    {
      dataField: "payment_date",
      sort: true,
      text: "Дата",
      attrs: {
        "data-label": "Дата",
      },
      formatter: row => {
        return <div>{row.split("-").reverse().join(".")}</div>
      },
    },
    {
      dataField: "referralFullName",
      sort: true,
      text: "Имя партнера",
      attrs: {
        "data-label": "Имя партнера",
      },
    },
    {
      dataField: "referralPartnerId",
      sort: true,
      text: "ID партнера",
      attrs: {
        "data-label": "ID партнера",
      },
    },
    {
      dataField: "wallet_addr",
      text: "Адрес кошелька",
      sort: true,
      attrs: {
        "data-label": "Адрес кошелька",
      },
      classes: "wallet__addr_col",
      formatter: (cell, row) => <ShortWallet id={row.id} wallet={cell} />,
    },
    {
      dataField: "amount",
      text: "Количество",
      sort: true,
      attrs: {
        "data-label": "Количество",
      },
      formatter: row => {
        const roundedValue = Math.ceil(row * 1000) / 1000
        return <div className="text-bold">{roundedValue} USDT</div>
      },
      sortFunc: (a, b, order) => {
        if (order === "asc") {
          return a - b
        }
        return b - a
      },
    },
    {
      dataField: "percent",
      text: "Процент",
      sort: true,
      attrs: {
        "data-label": "Процент",
      },
      formatter: row => {
        return <div>{row}%</div>
      },
    },
    {
      dataField: "accrual_type",
      text: "Тип",
      sort: true,
      attrs: {
        "data-label": "Тип",
      },
      formatter: row => {
        const values = {
          product: "Доход от продукта",
          referral: "Реферальный доход",
          upgrade: "Повышение пакета",
          passive: "Пассивный доход",
        }
        return <div>{values[row]}</div>
      },
    },
    {
      dataField: "product",
      text: "Продукт",
      sort: true,
      attrs: {
        "data-label": "Продукт",
      },
      formatter: row => {
        return <div>{row.product}</div>
      },
    },
    {
      dataField: "status",
      text: "Статус",
      sort: true,
      attrs: {
        "data-label": "Статус",
      },
      formatter: row => {
        const values = {
          sent: "Отправлено",
          waiting: "Ожидание",
          error: "Ошибка",
          nulled: "Аннулировано",
        }
        return <div>{values[row]}</div>
      },
    },
  ],
  headerFormatterCenteredTitle
)
