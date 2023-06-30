import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import DefaultProfileImage from 'pages/Dashboard/DefaultProfileImage';

import { t } from '../../../i18n';
import { getPhoto } from '../../../store/auth/photo/load/actions';

const ProfileMenu = (props) => {
  const [menu, setMenu] = useState(false);
  const fullName = useSelector((state) => state.Profile.user.fullName ?? '');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhoto());
  }, [props.success, props.upload]);

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item " id="page-header-user-dropdown" tag="button">
          <img
            className="rounded-circle header-profile-user"
            src={props.photo ?? DefaultProfileImage}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{fullName}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag={Link} to="/profile">
            {' '}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {t('common_profile')}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{t('common_logout')}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  photo: PropTypes.any,
  upload: PropTypes.any,
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  const { photo } = state.Photo;
  const { upload } = state.PhotoUpload;
  return { error, success, photo, upload };
};

export default withRouter(connect(mapStatetoProps, {})(withTranslation()(ProfileMenu)));
