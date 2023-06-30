import { useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ReCaptcha = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha(props?.action);
    props.onVerify(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return props.children({ handleReCaptchaVerify });
};

ReCaptcha.propTypes = {
  children: PropTypes.any,
  action: PropTypes.string,
  onVerify: PropTypes.func,
};

export default ReCaptcha;
