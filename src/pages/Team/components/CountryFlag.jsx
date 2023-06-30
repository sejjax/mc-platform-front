import React from 'react';

import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';

const CountryFlag = ({ title, emoji = false, ...props }) => {
  return (
    <div className="d-flex align-items-center">
      <ReactCountryFlag
        className={emoji ? 'emojiFlag' : ''}
        {...props}
        svg={emoji ? false : true}
        style={{
          width: '2em',
          height: '1em',
        }}
      />
      &nbsp;
      {title}
    </div>
  );
};

CountryFlag.propTypes = {
  title: PropTypes.string,
  emoji: PropTypes.bool,
};

export default CountryFlag;
