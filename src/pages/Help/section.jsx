import React from 'react';

import PropTypes from 'prop-types';

import { StSection } from './styles/wrapper';

const Section = React.forwardRef(({ children, title }, ref) => {
  return (
    <StSection>
      <h2 ref={ref}>{title}</h2>
      {children}
    </StSection>
  );
});

Section.displayName = 'Section';

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  ref: PropTypes.any,
};

export default Section;
