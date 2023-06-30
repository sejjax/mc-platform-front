import React from 'react';
import { useState } from 'react';

import withAdmin from 'hocs/withAdmin';
import parse from 'html-react-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody, Modal } from 'reactstrap';
// import { withTranslation } from 'react-i18next';
import { Col, Container, Row } from 'reactstrap';

// import './scss/list.scss';
import { getAllNotifications } from 'store/actions';

import Breadcrumbs from '../../../components/Common/Breadcrumb';

import { ACCESS } from 'constants/access';

import { t } from '../../../i18n';
import CustomDropdown from './CustomDropdown/CustomDropdown';
import DeleteModalNotification from './DeleteModal/DeleteModalNotification';

const paginationOptions = {
  paginationPosition: 'top',
};

function headerFormatter(column, colIndex, { sortElement }) {
  return (
    <div className="head-column">
      <p>{column.text}</p>
      {sortElement}
    </div>
  );
}

const columns = [
  {
    dataField: 'notification_type',
    text: t('notification_type'),
    sort: true,
    headerFormatter,
    attrs: {
      'data-label': t('notification_type'),
    },
  },
  {
    dataField: 'notification_text',
    text: t('notification_title'),
    classes: 'wrap',
    sort: true,
    attrs: {
      'data-label': t('notification_title'),
    },
    headerFormatter,
    formatter(row, cell) {
      return (
        <div>
          <p>
            <span className="fw-bold">{t('common_title')} </span>
            {cell.notification_title}
          </p>
          <div className="fw-bold">{t('common_text')}</div>
          <div>{parse(row)}</div>
        </div>
      );
    },
  },
  {
    dataField: 'notification_date',
    text: t('notification_date'),
    sort: true,
    headerFormatter,
    attrs: {
      'data-label': t('notification_date'),
    },
  },
  {
    dataField: 'delivery',
    text: t('notification_delivery_type'),
    sort: true,
    headerFormatter,
    attrs: {
      'data-label': t('notification_delivery_type'),
    },
    formatter(_cell, row) {
      const displayIsSite = row.isSite ? t('common_site') : '';
      const displayIsEmail = row.isEmail
        ? row.isSite
          ? `, ${t('common_mail')}`
          : t('common_mail')
        : '';
      return (
        <>
          {displayIsSite}
          {displayIsEmail}
        </>
      );
    },
  },
];

const AdminNotifications = ({ notifications, onGetNotifications, history }) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    selectedItem: null,
  });

  React.useEffect(() => {
    onGetNotifications?.();
  }, [onGetNotifications]);

  const notificationsData = React.useMemo(() => {
    return notifications.map(
      ({
        id,
        notification_date,
        notification_type,
        notification_title,
        notification_text,
        isSite,
        isEmail,
      }) => ({
        id,
        notification_date: moment(notification_date).format('DD-MM-YYYY , hh : mm '),
        notification_type: notification_type?.title || '',
        notification_title,
        notification_text,
        isSite,
        isEmail,
      }),
    );
  }, [notifications]);

  const editClickHandler = (id) => {
    history.push(`/admin/notificationsCreate/${id}`);
  };

  const deleteModalOpenHandler = (id) => {
    setDeleteModal({ isOpen: true, selectedItem: id });
  };

  const closeDeleteModal = () => {
    setDeleteModal((prevState) => ({ ...prevState, isOpen: false }));
  };

  const extendColumnsWithBtns = [
    ...columns,
    {
      dataField: 'buttons',
      text: '',
      sort: false,
      formatter: (_, row) => {
        return (
          <CustomDropdown
            editClickHandler={() => editClickHandler(row.id)}
            deleteClickHandler={() => deleteModalOpenHandler(row.id)}
          />
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('notification_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={t('notification_title')}
            hasBreadcrumbItem={false}
            breadcrumbItem={t('notification_all')}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="text-end">
                    <Button color="primary" className="notification__add_btn">
                      <Link className="button_a" to={'/admin/notificationsCreate'}>
                        {t('notification_create_notification')}
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-4">
                    <BootstrapTable
                      options={paginationOptions}
                      keyField="id"
                      data={notificationsData}
                      columns={extendColumnsWithBtns}
                      pagination={paginationFactory(paginationOptions)}
                      headerClasses="table-head"
                      wrapperClasses="table-responsive without__padding table text-start table__adaptive_bordered_between"
                      responsive
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <DeleteModalNotification
          closeModal={closeDeleteModal}
          isOpen={deleteModal.isOpen}
          selectedItemId={deleteModal.selectedItem}
        />
      </div>
    </React.Fragment>
  );
};

AdminNotifications.propTypes = {
  notifications: PropTypes.any,
  onGetNotifications: PropTypes.func,
  selectCurrentNotification: PropTypes.func,
  deleteNotification: PropTypes.func,
  addNotification: PropTypes.func,
  editNotificatio: PropTypes.func,
  history: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.Notifications.notifications,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onGetNotifications: () => dispatch(getAllNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withAdmin(AdminNotifications, ACCESS.notifications)));
