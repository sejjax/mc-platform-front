import React, { useMemo, useState } from 'react';

import { useFormik } from 'formik';
import parse from 'html-react-parser';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

import DepositModal from 'components/DepositModals/DepositModal/DepositModal';

import { t } from '../../../i18n';
import schema from '../../../yupshema/investSchema';
import ProjectImage from '../projectImage';

const ProjectDetail = ({ project }) => {
  const [isConnectWallet, setIsConnectWallet] = useState(false);

  const [invested, setInvested] = useState(0);
  const [walletModal, setWalletModal] = useState(false);
  const calcReceive = useMemo(() => {
    const apy = project?.apy ?? 0;
    return ((apy / 100) * invested + invested).toFixed(2);
  }, [invested]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      amount: 0,
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //dispatch()
    },
  });

  const handleValidDate = (date) => {
    return moment(new Date(date)).format('DD MMM Y');
  };

  return (
    <Card>
      <CardBody className="project-receive">
        <div className="d-flex">
          <ProjectImage name={project.name} url={project.image && project.image.url} />

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-15">
              <span>{project.name}</span>
              {/* {project.symbol && <span className="symbol">{project.symbol}</span>} */}
            </h5>
            <p className="text-muted">{parse(project.description)}</p>
          </div>
        </div>
        <Row>
          <Col
            lg={{
              offset: 3,
              size: 6,
            }}>
            <Button color={'primary'} block onClick={() => setWalletModal(true)}>
              {t('common_invest')}
            </Button>
          </Col>
        </Row>
        {/* <h5 className="font-size-15 mt-4">Подробно о проекте:</h5>

        <p className="text-muted">{parse(get(project, "details") ?? "")}</p>

        <div className="text-muted mt-4">
          {project.projectDetails &&
            map(project.projectDetails.points, (point, index) => (
              <p key={index}>
                <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                {point}
              </p>
            ))}
        </div>

        <Row className="task-dates">
          <Col sm="4">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar me-1 text-primary" /> Дата начала
                инвестиций
              </h5>
              <p className="text-muted mb-0">
                {handleValidDate(project.startDate)}
              </p>
            </div>
          </Col>

          <Col sm="4">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar-check me-1 text-primary" /> Проект
                будет завершён
              </h5>
              <p className="text-muted mb-0">
                {handleValidDate(project.dueDate)}
              </p>
            </div>
          </Col>

          <Col sm="4">
            <div className="mt-4">
              <h5 className="font-size-14">Годовая доходность</h5>
              <p className="text-muted mb-0">
                {project.apy} <i className="text-primary">%</i>
              </p>
            </div>
          </Col> */}
        {/* </Row> */}
      </CardBody>
      <DepositModal isOpen={walletModal} closeHandler={() => setWalletModal(false)} />
    </Card>
  );
};

ProjectDetail.propTypes = {
  project: PropTypes.object,
};

export default ProjectDetail;
