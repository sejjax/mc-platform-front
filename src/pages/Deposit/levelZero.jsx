import React from 'react';

import PropTypes from 'prop-types';
import { Button, Container } from 'reactstrap';

import { t } from '../../i18n';

const ZeroLevel = ({ handlerClick }) => {
  return (
    <Container
      fluid
      style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div style={{ width: '40%' }}>
        <Button
          color="primary"
          className="btn-lg btn-block"
          style={{ width: '100%' }}
          onClick={handlerClick}>
          {t('common_connect_wallet')}
        </Button>
      </div>
    </Container>
  );
};

export default ZeroLevel;

ZeroLevel.propTypes = {
  handlerClick: PropTypes.func,
};
