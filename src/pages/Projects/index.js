import React from 'react';

import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import { t } from '../../i18n';
import ProjectsList from './projectsList';
import './scss/breadcrumb.scss';
import './scss/projects.scss';

const Projects = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('project_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <ProjectsList />
        </Container>
      </div>
    </React.Fragment>
  );
};

Projects.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStateProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(connect(mapStateProps, {})(withTranslation()(Projects)));
