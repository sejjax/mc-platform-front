import React, { useState } from 'react';

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { DROPDOWN_OPTIONS } from './utils';

const PageSizeDropdown = ({ currentSize, setCurrentSize }) => {
  const [menu, setMenu] = useState(false);

  const handleSetCurrentSize = (size) => {
    setCurrentSize(size);
  };
  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <Dropdown isOpen={menu} toggle={toggle} className="me-2">
      <DropdownToggle>{currentSize}</DropdownToggle>
      <DropdownMenu>
        {DROPDOWN_OPTIONS.map((item) => (
          <DropdownItem key={item.value} onClick={() => handleSetCurrentSize(item.value)}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default PageSizeDropdown;
