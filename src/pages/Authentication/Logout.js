import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDisconnect } from 'wagmi';

import { logoutUser } from '../../store/actions';

const Logout = (props) => {
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
    dispatch(logoutUser(props.history));
  }, []);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
