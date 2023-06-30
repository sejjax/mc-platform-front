import React from 'react';

import parse from 'html-react-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';

// import './scss/list.scss';
import { getNotifications } from 'store/actions';

import { t } from '../../i18n';

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
    dataField: 'notification_title',
    text: t('notification_item_title'),
    sort: true,
    headerFormatter,
    attrs: {
      'data-label': t('notification_item_title'),
    },
    formatter: (row) => <p>{row}</p>,
  },

  {
    dataField: 'notification_text',
    text: t('notification_text'),
    sort: true,
    attrs: {
      'data-label': t('notification_text'),
    },
    headerFormatter,
    formatter(row) {
      return <p>{parse(row)}</p>;
    },
  },
];

const Notifications = ({ notifications, onGetNotifications }) => {
  React.useEffect(() => {
    onGetNotifications?.();
  }, [onGetNotifications]);

  const notificationsData = React.useMemo(() => {
    return notifications.map(
      ({ id, notification_date, notification_type, notification_title, notification_text }) => ({
        id,
        notification_date: moment(notification_date).format('DD-MM-YYYY , hh : mm '),
        notification_type: notification_type?.title || '',
        notification_title,
        notification_text,
      }),
    );
  }, [notifications]);

  return (
    <Card>
      <CardBody>
        {/* {userAccess && (
          <div className="text-end">
            <Button color="primary">
              <Link className="button_a" to={"/notificationsCreate"}>
                Создать уведомление
              </Link>
            </Button>
          </div>
        )} */}
        <div className="mt-4">
          <BootstrapTable
            options={paginationOptions}
            keyField="id"
            data={notificationsData}
            columns={columns}
            pagination={paginationFactory(paginationOptions)}
            headerClasses="table-head"
            wrapperClasses="table-responsive without__padding table text-start table__adaptive_bordered_between"
            responsive
          />
        </div>
      </CardBody>
    </Card>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.any,
  onGetNotifications: PropTypes.func,
  userAccess: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.Notifications.notifications,
    userAccess: state.Profile.user.role?.access?.includes('notifications') || false,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onGetNotifications: () => dispatch(getNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
