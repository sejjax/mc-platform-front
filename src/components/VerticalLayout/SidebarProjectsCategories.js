import React, { useContext, useEffect } from 'react';

import useTranslation from 'hooks/useTranslation';
import { isEmpty, map } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { getProjectsList as onGetProjectsList } from 'store/actions';

import { convertLocale } from '../../helpers/convertLocation';
import LanguageContext from '../../helpers/localization/languageContext';

const SidebarProjectsCategories = () => {
  const dispatch = useDispatch();
  const { language } = useContext(LanguageContext);
  const t = useTranslation();

  useEffect(() => {
    dispatch(onGetProjectsList(convertLocale(language)));
  }, [dispatch, language]);

  const { projectsList } = useSelector((state) => ({
    projectsList: state.Project.projectsList,
  }));

  if (isEmpty(projectsList) && !Array.isArray(projectsList)) return null;
  return (
    <React.Fragment>
      <li key="projects">
        <Link to="#" className="li__first_dropdown has-arrow li__sidebar">
          <i className="bx bx-briefcase" />
          <span>{t('sidebar_projects_label')}</span>
        </Link>
        <ul className="sub-menu">
          {map(projectsList, (project) => (
            <li key={project.id}>
              <NavLink to={`/projects/${project.slug}`} key={project.slug}>
                <span>{project.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    </React.Fragment>
  );
};

SidebarProjectsCategories.propTypes = {
  t: PropTypes.any,
};

export default withRouter(SidebarProjectsCategories);
