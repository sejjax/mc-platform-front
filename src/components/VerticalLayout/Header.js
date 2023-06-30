import React, { useState } from 'react';

import PropTypes from 'prop-types';
//i18n
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import logoSmall from '../../assets/images/logoSmall.png';
import NotificationDropdown from '../../pages/Notifications/NotificationDropdown';
// Redux Store
import { changeSidebarType, toggleLeftmenu } from '../../store/actions';
// Import menuDropdown
import LanguageDropdown from '../CommonForBoth/TopbarDropdown/LanguageDropdown';
import ProfileMenu from '../CommonForBoth/TopbarDropdown/ProfileMenu';

const Header = (props) => {
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle('sidebar-enable');
    } else {
      body.classList.toggle('vertical-collpsed');
      body.classList.toggle('sidebar-enable');
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSmall} alt="" height="22" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            {/* <LanguageDropdown /> */}

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon "
                data-toggle="fullscreen">
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            {/* <NotificationDropdown /> */}
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, leftMenu, leftSideBarType } = state.Layout;
  return { layoutType, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
