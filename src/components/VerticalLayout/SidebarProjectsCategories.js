import React, { useEffect } from "react"
import { Link, NavLink, withRouter } from "react-router-dom"
import { isEmpty, map } from "lodash"

import { withTranslation } from "react-i18next"

import { getProjectsList as onGetProjectsList } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"

const SidebarProjectsCategories = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetProjectsList())
  }, [dispatch])

  const { projectsList } = useSelector(state => ({
    projectsList: state.Project.projectsList,
  }))

  if (isEmpty(projectsList) && !Array.isArray(projectsList)) return null
  return (
    <React.Fragment>
      <li key="projects">
        <Link to="#" className="li__first_dropdown has-arrow li__sidebar">
          <i className="bx bx-briefcase" />
          <span>Проекты</span>
        </Link>
        <ul className="sub-menu">
          {map(projectsList, project => (
            <li key={project.id}>
              <NavLink to={`/projects/${project.slug}`} key={project.slug}>
                <span>{project.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    </React.Fragment>
  )
}

SidebarProjectsCategories.propTypes = {
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarProjectsCategories))
