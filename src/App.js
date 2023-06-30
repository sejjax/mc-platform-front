import React, { useEffect } from 'react';

import getAuthUser from 'helpers/GetAuthUser';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { fetchProfileData } from 'store/actions';

import NonAuthLayout from './components/NonAuthLayout';
// layouts Format
import VerticalLayout from './components/VerticalLayout';
import Modals from 'components/Modals/Modals';

// Import scss
import './assets/scss/theme.scss';
// Import Routes all
import { authProtectedRoutes, publicRoutes } from './routes';
// Import all middleware
import Authmiddleware from './routes/route';

const App = () => {
  const dispatch = useDispatch();
  function getLayout() {
    const layoutCls = VerticalLayout;

    return layoutCls;
  }

  useEffect(() => {
    const user = getAuthUser();
    user && dispatch(fetchProfileData());
  }, []);

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
        <Modals />
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
