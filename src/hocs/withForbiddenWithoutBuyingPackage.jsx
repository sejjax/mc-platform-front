import React from 'react';

import { useSelector } from 'react-redux';

import { isUserBoughtProjectSelector } from 'store/auth/profile/selectors';

import ForbiddenPage from 'pages/ForbiddenPage/ForbiddenPage';

const withForbiddenWithoutBuyingPackage = (Component) => {
  const WithForbiddenWithoutBuyingPackage = (props) => {
    const investorLevel = useSelector(isUserBoughtProjectSelector);
    if (!investorLevel) return <ForbiddenPage />;
    return <Component {...props} />;
  };
  WithForbiddenWithoutBuyingPackage.displayName = 'withForbiddenWithoutBuyingPackage';
  return WithForbiddenWithoutBuyingPackage;
};

export default withForbiddenWithoutBuyingPackage;
