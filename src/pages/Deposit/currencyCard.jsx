import React from 'react';

import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

import { t } from '../../i18n';

const CurrencyCard = ({ title, icon, description, currentPrice, onClick, isActive }) => {
  return (
    <div>
      <CardText className="font-size-14">Валюта</CardText>
      <Card
        className={isActive ? 'border border-primary' : 'border'}
        onClick={() => {
          onClick(title);
        }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 5fr',
            gap: '10px',
            padding: '15px 5px',
            cursor: 'pointer',
          }}>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <CardImg
              style={{
                width: '30px',
              }}
              src={icon}
            />
          </div>

          <div>
            <CardTitle>{title}</CardTitle>
            <CardText>{description}</CardText>
          </div>
        </div>
      </Card>
      <div>
        <p className="font-size-13" style={{ color: '#74788D' }}>
          {t('common_current_price')}
        </p>
        <h4 className="font-size-16">{currentPrice}</h4>
      </div>
    </div>
  );
};

export default CurrencyCard;

CurrencyCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};
