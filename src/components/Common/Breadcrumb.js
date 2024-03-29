import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BreadcrumbItem, Col, Row } from 'reactstrap';

const Breadcrumb = (props) => {
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>
          {props.hasBreadcrumbItem ? (
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <BreadcrumbItem>
                  <Link to="#">{props.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Link to="#">{props.breadcrumbItem}</Link>
                </BreadcrumbItem>
              </ol>
            </div>
          ) : null}
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  hasBreadcrumbItem: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  hasBreadcrumbItem: true,
};

export default Breadcrumb;
