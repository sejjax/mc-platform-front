import React from 'react';

import PropTypes from 'prop-types';

const API_URL = process.env.REACT_APP_STRAPI_URL;

const ProjectImage = (props) => {
  return (
    <React.Fragment>
      <div className="project-image">
        {props.url && <img src={API_URL + props.url} alt={props.name} className="avatar-sm" />}
      </div>
    </React.Fragment>
  );
};

ProjectImage.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default ProjectImage;
