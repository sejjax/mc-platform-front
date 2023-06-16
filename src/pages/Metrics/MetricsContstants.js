import { countryName } from "constants/countries"
import { addHeaderFormatterToTableColumns } from "helpers/table_helper"
import { roundToDynamicNumbers } from "helpers/Utils"
import CountryFlag from "pages/Team/components/CountryFlag"
import React from "react"
export const metricsTableNavItems = ["day", "week", "month", "year"]
export const metricsNavDisplayedTitles = {
  day: "День",
  week: "Неделя",
  month: "Месяц",
  year: "Год",
}

export const projectsTable = addHeaderFormatterToTableColumns([
  {
    dataField: "title",
    text: "Название",
    sort: true,
    attrs: {
      "data-label": "Название",
    },
  },
  {
    dataField: "projectIncome",
    text: "Доход",
    sort: true,
    attrs: {
      "data-label": "Доход",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
  {
    dataField: "amountToPay",
    text: "К выплате",
    sort: true,
    attrs: {
      "data-label": "К выплате",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
  {
    dataField: "depositCount",
    text: "Количество депозитов",
    sort: true,
    attrs: {
      "data-label": "Количество депозитов",
    },
  },
  {
    dataField: "projectPayments",
    text: "Выплаты",
    sort: true,
    attrs: {
      "data-label": "Выплаты",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
])
export const usersTable = addHeaderFormatterToTableColumns([
  {
    dataField: "fio",
    text: "ФИО",
    sort: true,
    attrs: {
      "data-label": "ФИО",
    },
  },
  {
    dataField: "mobile",
    text: "Телефон",
    sort: true,
    attrs: {
      "data-label": "Телефон",
    },
  },
  {
    dataField: "country",
    text: "Страна",
    sort: true,
    attrs: {
      "data-label": "Страна",
    },
    formatter(row) {
      return <CountryFlag countryCode={row} title={countryName[row]} />
    },
  },
  {
    dataField: "referralsCount",
    text: "Партнеров привлечено",
    sort: true,
    attrs: {
      "data-label": "Партнеров привлечено",
    },
  },
  {
    dataField: "teamDeposit",
    text: "Приход средств от команды",
    sort: true,
    attrs: {
      "data-label": "Приход средств от команды",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
  {
    dataField: "depositAmount",
    text: "Средств инвестировано",
    sort: true,
    attrs: {
      "data-label": "Средств инвестировано",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
  {
    dataField: "productIncome",
    text: "Доход от продуктов",
    sort: true,
    attrs: {
      "data-label": "Доход от продуктов",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
  {
    dataField: "referralsIncome",
    text: "Дохов от партнеров",
    sort: true,
    attrs: {
      "data-label": "Дохов от партнеров",
    },
    formatter(row) {
      return <>{roundToDynamicNumbers(row, 100)}</>
    },
  },
])

export const pageOptions = {
  sizePerPage: 100,
  custom: true,
  sizePerPageList: [
    {
      text: "10",
      value: 10,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "50",
      value: 50,
    },
    {
      text: "100",
      value: 100,
    },
  ],
}
