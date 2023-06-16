import React, { useState } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import shapesImg from "assets/images/shapes.svg"
import "./CustomDropdown.scss"
import ProPTypes from "prop-types"

const CustomDropdown = ({ deleteClickHandler, editClickHandler }) => {
  const [isOpen, setisOpen] = useState(false)

  const toggleHandler = () => {
    setisOpen(!isOpen)
  }

  return (
    <div className="text-center">
      <Dropdown toggle={toggleHandler} isOpen={isOpen}>
        <DropdownToggle className="dropdown__btn" color="primary">
          <img src={shapesImg} alt="" />
        </DropdownToggle>
        <DropdownMenu className="table__dropdown_list">
          <DropdownItem
            className="table__dropdown_item_edit"
            onClick={editClickHandler}
          >
            Редактировать
          </DropdownItem>
          <div className="custom-dropdown-divider"></div>
          <DropdownItem
            className="table__dropdown_item_delete"
            onClick={deleteClickHandler}
          >
            Удалить
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

CustomDropdown.propTypes = {
  deleteClickHandler: ProPTypes.func,
  editClickHandler: ProPTypes.func,
}

export default CustomDropdown
