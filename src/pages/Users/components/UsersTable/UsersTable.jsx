import React, { useState } from "react"
import PropTypes from "prop-types"
import Table from "components/Table/Table"
import { usersTableFakeData } from "./UsersTableConstants"
import { usersTableColumns } from "./UsersTableConstants"
import DeleteModal from "./components/DeleteModal/DeleteModal"
import { useMemo } from "react"
import { useRef } from "react"
import { Button } from "reactstrap"

const UsersTable = props => {
  const [modalData, setModalActive] = useState({
    active: false,
    id: -1,
    username: "adasd",
    permissions: [],
  })

  const deleteClickHandler = row => {
    const { id, username, permissions } = row
    setModalActive({ id, username, permissions, active: true })
  }
  const tableCols = useRef([
    ...usersTableColumns,
    {
      classes: "users__table_custom_col users__table_custom_col_btn",
      dataField: "delete_btn",
      text: "",
      formatter: (cell, row) => {
        return (
          <Button onClick={() => deleteClickHandler(row)} color="danger">
            Delete rights
          </Button>
        )
      },
    },
  ])

  return (
    <div>
      <Table
        data={usersTableFakeData}
        columns={tableCols.current}
        custom={{ classes: "users__table_custom", bordered: false }}
      />
      <DeleteModal data={modalData} activeHandler={setModalActive} />
    </div>
  )
}

UsersTable.propTypes = {}

export default UsersTable
