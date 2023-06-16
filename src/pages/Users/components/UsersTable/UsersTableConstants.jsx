import { Button } from "reactstrap"
import React from "react"

const columnFormatter = (cell, row) => {
  return <div>{cell}</div>
}

export const pageOptions = {
  sizePerPage: 25,
  custom: true,
  sizePerPageList: [
    {
      text: "50",
      value: 50,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "10",
      value: 10,
    },
  ],
}

export const usersTableColumns = [
  {
    dataField: "id",
    hidden: true,
    sort: false,
  },
  {
    dataField: "username",
    text: "Username",
    sort: true,

    classes: "users__table_custom_col",
  },
  {
    dataField: "partner_id",
    text: "Partner ID",
    classes: "users__table_custom_col",
    sort: true,
    headerSortingClasses: (_, sortOrder) => {
      if (sortOrder === "desc") {
        return "users__table_custom_sort"
      }
      return
    },
  },
  {
    dataField: "email",
    text: "Email",
    classes: "users__table_custom_col",
    sort: true,
    headerSortingClasses: (_, sortOrder) => {
      if (sortOrder === "desc") {
        return "users__table_custom_sort"
      }
      return
    },
  },
  {
    dataField: "permissions",
    text: "Permissions",
    classes: "users__table_custom_col",
    sort: true,
    headerSortingClasses: (_, sortOrder) => {
      if (sortOrder === "desc") {
        return "users__table_custom_sort"
      }
      return
    },
  },
  {
    dataField: "last_login",
    text: "Last login",
    classes: "users__table_custom_col",
    sort: true,
    headerSortingClasses: (_, sortOrder) => {
      if (sortOrder === "desc") {
        return "users__table_custom_sort"
      }
      return
    },
  },
]

export const usersTableFakeData = [
  {
    id: 1,
    username: "Ilya",
    partner_id: "123",
    email: "123",
    permissions: "123",
    last_login: "123",
  },
  {
    id: 2,
    username: "Egor",
    partner_id: "123",
    email: "123",
    permissions: "123",
    last_login: "123",
  },
  {
    id: 3,
    username: "Oleg",
    partner_id: "123",
    email: "123",
    permissions: "123",
    last_login: "123",
  },
  {
    id: 4,
    username: "Vasya",
    partner_id: "123",
    email: "123",
    permissions: "123",
    last_login: "123",
  },
]
