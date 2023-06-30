import React, { useEffect, useState } from 'react';

import { API_URL, post } from 'helpers/api_helper';
import { useDispatch } from 'react-redux';
import { NavLink, useParams, withRouter } from 'react-router-dom';

import { setProfileData } from 'store/actions';

import { t } from '../../i18n';

const ConfirmChangeDefaultWallet = ({ history }) => {
  const { hash } = useParams();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const confirmWallet = async () => {
      try {
        const res = await post(`${API_URL}/change-default-wallet-addr/confirm`, {
          hash,
        });
        if (res.data.default_wallet_address)
          dispatch(
            setProfileData({
              default_wallet_address: res.data.default_wallet_address,
            }),
          );
        history.push('/dashboard');
      } catch (error) {
        const message = error.response.data?.message;
        if (message) setError(message);
        else setError(true);
      }
    };
    confirmWallet();
  }, []);

  return (
    <div
      className="position-absolute top-50 start-50 text-center"
      style={{ transform: 'translate(-50%,-50%)' }}>
      <h5>
        {error === true && t('common_was_error')}
        {typeof error === 'string' && error}
      </h5>
      {error && <NavLink to={'/dashboard'}>{t('common_to_home_page')}</NavLink>}
    </div>
  );
};

export default withRouter(ConfirmChangeDefaultWallet);
