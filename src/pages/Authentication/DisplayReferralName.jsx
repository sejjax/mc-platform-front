import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useDebounce } from 'hooks/useDebounce';
import PropTypes from 'prop-types';

import { fetchReferralName } from 'services/authService';

import { t } from '../../i18n';

const DisplayReferralName = ({ referralId, setError, setTouched }) => {
  const [referralName, setReferralName] = useState('');
  const debouncedValue = useDebounce(referralId, 200);

  const fetchDisplayReferralName = async () => {
    const res = await fetchReferralName(referralId);
    setReferralName(res.name);
    if (!res.name) {
      setError('referrerId', t('auth_register_simple_inviter_error'));
      setTouched('referrerId', true);
    }
  };

  useEffect(() => {
    fetchDisplayReferralName();
  }, [debouncedValue]);

  return (
    <span>
      {referralName !== null && t('auth_register_inviter_name', { referralName })}
      {/* {referralName === null && `Пригласитель не найден`} */}
    </span>
  );
};

DisplayReferralName.propTypes = {
  referralId: PropTypes.string,
};
export default DisplayReferralName;
