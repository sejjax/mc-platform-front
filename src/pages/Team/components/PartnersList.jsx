import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';

import { getPartners } from 'store/team/actions';

import '../scss/list.scss';
import List from './List';

export function headerFormatter(column, colIndex, { sortElement }) {
  return (
    <div className="head-column">
      <p>{column.text}</p>
      {sortElement}
    </div>
  );
}

const PartnersList = ({ partners, getPartners, userPartnerId, fullName }) => {
  useEffect(() => {
    getPartners();
  }, []);

  return (
    <Card>
      <CardBody>
        <List fullName={fullName} partners={partners} userPartnerId={userPartnerId} />
      </CardBody>
    </Card>
  );
};

PartnersList.propTypes = {
  partners: PropTypes.array,
  getPartners: PropTypes.func,
  fullName: PropTypes.any,
  userPartnerId: PropTypes.any,
};

const mapStateToProps = (state) => ({
  partners: state.Team.partners,
  userPartnerId: state.Profile.user.partnerId,
  fullName: state.Profile.user.fullName,
});

const mapDispatchToProps = (dispatch) => ({
  getPartners: () => dispatch(getPartners()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersList);
