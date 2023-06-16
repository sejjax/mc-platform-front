/* eslint-disable react/jsx-no-undef */
import React from "react"
import {
  addHeaderFormatterToTableColumns,
  headerFormatterCenteredTitle,
} from "helpers/table_helper"
import ShortWallet from "components/SharedAcrrualsPage/components/ShortWallet"

export const DISPLAYED_KEY_NAMES = {
  payment_date: "Дата",
  partnerFullName: "Имя партнера",
  partnerId: "ID партнера",
  wallet_addr: "Адрес кошелька",
  amount: "Количество",
  percent: "Процент",
  accrual_type: "Тип",
  product: "Продукт",
  status: "Статус",
  packageLevel: "Номер пакета",
}

export const columns = addHeaderFormatterToTableColumns(
  [
    {
      dataField: "payment_date",
      text: "Дата",
      sort: true,
      attrs: {
        "data-label": "Дата",
      },
      formatter: row => {
        return <div>{row.split("-").reverse().join(".")}</div>
      },
    },
    {
      dataField: "wallet_addr",
      sort: true,
      text: "Адрес кошелька",
      attrs: {
        "data-label": "Адрес кошелька",
      },
      classes: "wallet__addr_col",
      formatter: (cell, row) => <ShortWallet id={row.id} wallet={cell} />,
    },
    {
      dataField: "buyOrder",
      text: "Номер пакета",
      sort: true,
      attrs: {
        "data-label": "Номер пакета",
      },
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
      sort: true,
      dataField: "percent",
      text: "Процент",
      attrs: {
        "data-label": "Процент",
      },
      formatter: row => {
        return <div>{row}%</div>
      },
    },
    {
      dataField: "accrual_type",
      sort: true,
      text: "Тип",
      attrs: {
        "data-label": "Тип",
      },
      formatter: row => {
        const values = {
          product: "Доход от продукта",
          referral: "Реферал",
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
