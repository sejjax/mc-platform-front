import React from 'react';

import { useSelector } from 'react-redux';

import { getAccessSelector } from 'store/auth/profile/selectors';

const withAdmin = (Component, accessName) => {
  const WithAdmin = (props) => {
    const access = useSelector(getAccessSelector);
    if (!access.includes(accessName))
      return (
        <div className="page-content">
          <h5>Доступ запрещен</h5>
        </div>
      );
    return <Component {...props} />;
  };
  WithAdmin.displayName = 'withAdmin';
  return WithAdmin;
};

export default withAdmin;
