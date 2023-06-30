import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'reactstrap';

import { Notifications } from './Notifications';

const NotificationDropdown = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  return (
    <Dropdown
      isOpen={menu}
      toggle={() => setMenu(!menu)}
      className="dropdown d-inline-block"
      tag="li">
      <DropdownToggle
        className="btn header-item noti-icon"
        tag="button"
        id="page-header-notifications-dropdown">
        <i className="bx bx-bell bx-tada" style={{ animation: 'none' }} />
        <span className="badge bg-danger rounded-pill"></span>
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
        {/* <Notifications></Notifications> */}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
