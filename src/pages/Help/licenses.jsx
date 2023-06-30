import React from 'react';

import PropTypes from 'prop-types';

import { t } from '../../i18n';
import Row from './row';
import { Grid, GridHeader, Root } from './styles/licenses';

const Licenses = ({ info }) => {
  const { licenseState = [] } = info;

  return (
    <>
      <Root>
        <Grid>
          <GridHeader>
            <strong>{t('common_state')}</strong>
          </GridHeader>
          <GridHeader>
            <strong>{t('common_license')}</strong>
          </GridHeader>
          <GridHeader>
            <strong>{t('common_state_agency')}</strong>
          </GridHeader>
        </Grid>
        {licenseState &&
          licenseState.map((el) => (
            <Grid key={el.state}>
              <Row data={el} />
            </Grid>
          ))}
      </Root>
    </>
  );
};

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
      }),
    ),
  }),
};
