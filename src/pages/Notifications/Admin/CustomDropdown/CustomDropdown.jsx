import React, { useState } from 'react';

import shapesImg from 'assets/images/shapes.svg';
import ProPTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { t } from '../../../../i18n';
import './CustomDropdown.scss';

const CustomDropdown = ({ deleteClickHandler, editClickHandler }) => {
  const [isOpen, setisOpen] = useState(false);

  const toggleHandler = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className="text-center">
      <Dropdown toggle={toggleHandler} isOpen={isOpen}>
        <DropdownToggle className="dropdown__btn" color="primary">
          <img src={shapesImg} alt="" />
        </DropdownToggle>
        <DropdownMenu className="table__dropdown_list">
          <DropdownItem className="table__dropdown_item_edit" onClick={editClickHandler}>
            {t('common_edit')}
          </DropdownItem>
          <div className="custom-dropdown-divider"></div>
          <DropdownItem className="table__dropdown_item_delete" onClick={deleteClickHandler}>
            {t('common_delete')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

CustomDropdown.propTypes = {
  deleteClickHandler: ProPTypes.func,
  editClickHandler: ProPTypes.func,
};

export default CustomDropdown;
