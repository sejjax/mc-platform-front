import React from 'react';

import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';

const CardMaintenance = (props) => {
  return (
    <React.Fragment>
      <Col md="4">
        <Card className="mt-4 maintenance-box">
          <CardBody>{props.children}</CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardMaintenance.propTypes = {
  children: PropTypes.any,
};

export default CardMaintenance;
