import React from "react"

import { MetaTags } from "react-meta-tags"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import {Container} from "reactstrap";

import { withRouter } from "react-router-dom"

import ProjectsList from './projectsList'

import "./scss/projects.scss"
import "./scss/breadcrumb.scss"

const Projects = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Проекты MCapital</title>
        </MetaTags>
        <Container fluid>
          <ProjectsList />
        </Container>
      </div>
    </React.Fragment>
  )
}

Projects.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStateProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateProps, {})(withTranslation()(Projects))
)
