import React from 'react';
import PropTypes from 'prop-types'

import {Root, Grid, GridHeader} from './styles/licenses';
import Row from './row';

const Licenses = ({info}) => {
  
  const {licenseState = []} = info;

  return (
    <>
      <Root>
        <Grid>
          <GridHeader>
            <strong>State</strong>
          </GridHeader>
          <GridHeader>
            <strong>License</strong>
          </GridHeader>
          <GridHeader>
            <strong>State agency</strong>
          </GridHeader>
        </Grid>
        {licenseState &&
          licenseState.map(el => (
            <Grid key={el.state}>
              <Row data={el} />
            </Grid>
          ))}
      </Root>
    </>
  )
}

export default Licenses;

Licenses.propTypes = {
  info: PropTypes.shape({
    licenseState: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        license: PropTypes.string,
        stateAgency: PropTypes.shape({
          address: PropTypes.string,
          agensyName: PropTypes.string,
          index: PropTypes.string,
          mobile: PropTypes.string,
        }),
      })
    ),
  }),
}