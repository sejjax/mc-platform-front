import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import logoSmall from '../../assets/images/logoSmall.png';
import SidebarContent from './SidebarContent';

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-light">
            <span className="logo-lg">
              <img src={logo} alt="" style={{ width: '150px' }} />
            </span>
            <span className="logo-sm">
              <img src={logoSmall} alt="" style={{ width: '30px' }} />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== 'condensed' ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStatetoProps, {})(withRouter(Sidebar));
