import React, { useEffect } from 'react';

import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import { getProjectDetail as onGetProjectDetail } from 'store/projects/project/actions';

//Import Breadcrumb
import Breadcrumbs from 'components/Common/Breadcrumb2';

import { t } from '../../../i18n';
import OverviewChart from './overviewChart';
import ProjectDetail from './projectDetail';

// import RangeSlider from "../rangeSlider"

const Index = (props) => {
  const dispatch = useDispatch();

  const { projectDetail } = useSelector((state) => ({
    projectDetail: state.Project.projectDetail,
  }));

  const {
    match: { params },
  } = props;

  useEffect(() => {
    if (params && params.slug) {
      dispatch(onGetProjectDetail(params.slug));
    }
  }, [params, onGetProjectDetail]);

  const breadcrumbItems = [
    t('sidebar_projects_label'),
    projectDetail?.categories?.name,
    projectDetail?.name,
  ];

  return (
    <React.Fragment>
      <div className="page-content page-project">
        <MetaTags>
          <title>{projectDetail.name}</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title={projectDetail.name}
            breadcrumbItems={breadcrumbItems.map((item) => ({ title: item }))}
          />

          {!isEmpty(projectDetail) && (
            <>
              <Row>
                <Col xl={9} sm={12}>
                  <ProjectDetail project={projectDetail} />
                </Col>
                {/* {!isEmpty(projectDetail.apyChanging) && (
                  <Col xl={3} sm={12}>
                    <RangeSlider risk={projectDetail.risk} disabled />
                  </Col>
                )} */}
              </Row>

              {/* {!isEmpty(projectDetail.apyChanging) && (
                <Row>
                  <Col xl={9} sm={12}>
                    <OverviewChart apyChanging={projectDetail.apyChanging} />
                  </Col>
                </Row>
              )} */}
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

Index.propTypes = {
  match: PropTypes.object,
};

export default withRouter(Index);
