import React from 'react';

import getAuthUser from 'helpers/GetAuthUser';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (Component) => {
  const WithAuthRedirect = (props) => {
    const authUser = getAuthUser();
    if (authUser) return <Redirect to={'/dashboard'} />;
    return <Component {...props} />;
  };
  WithAuthRedirect.displayName = 'withAuthRedirect';
  return WithAuthRedirect;
};

export default withAuthRedirect;
