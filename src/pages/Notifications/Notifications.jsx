import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { getNotifications } from 'store/actions';

import useTranslation from '../../hooks/useTranslation';

const add_zero = (num) => {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
};

const pretty_date_function = (ts) => {
  let date = Date.parse(ts);
  let d = new Date(date);
  let month = Number(d.getMonth()) + 1;
  let buy_date =
    d.getFullYear() +
    '-' +
    add_zero(d.getDay()) +
    '-' +
    add_zero(month) +
    ' ' +
    add_zero(d.getHours()) +
    ':' +
    d.getMinutes();
  return buy_date;
};
const Notifications = ({ notifications, onGetNotifications }) => {
  const [height, setHeight] = useState(420);
  const t = useTranslation();

  const hasNotifications = React.useMemo(() => {
    if (!notifications) {
      return false;
    }
    for (const count of notifications) {
      if (count !== 0) {
        return true;
      }
    }
    return false;
  }, [notifications]);

  useEffect(() => {
    const element = document.querySelector('.dashboard__left_card');
    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeight(entry?.contentRect?.height ?? 420);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    onGetNotifications?.();
  }, [onGetNotifications]);

  return (
    <Card
      className="p-3 same-height"
      style={{
        marginBottom: '0px',
        maxHeight: height,
      }}>
      <CardTitle style={{ paddingLeft: '0.55rem' }}>
        <div className="title">
          <h4 className="title__count font-size-15">{t('notification_title')}</h4>
          <Link className="font-size-13" to="/notificationslist">
            {t('notification_view_all')}
          </Link>
        </div>
      </CardTitle>
      {!hasNotifications && (
        <div className="referrals-zero">
          <div>
            <p>{t('notification_not_have_data')}</p>
          </div>
        </div>
      )}
      <Card style={{ height: '100%', overflow: 'auto', marginBottom: '0px' }}>
        {hasNotifications &&
          notifications.map((n) => (
            <CardBody
              className="notification_card"
              key={n.id}
              style={{
                padding: '0.5rem',
                borderBottom: '1px solid rgb(239, 242, 247)',
              }}>
              <div className="notification_leftside">
                <h4 className="notification_title" key={n.notification_title}>
                  {n.notification_title}
                </h4>
                <p className="notification_text" key={n.notification_text}>
                  {parse(n.notification_text)}
                </p>
              </div>
              <div className="notification_rightside">
                <p className="notification_type" key={n.notification_type}>
                  {n.notification_type?.title ?? ''}
                </p>
              </div>
              {/* <div className="notification_bottom">
                <p className="notification_date" key={n.notification_date}>
                  {pretty_date_function(n.notification_date)}
                </p> */}
              {/* <p className='notification_read_more'>Read More</p> */}
              {/* </div> */}
            </CardBody>
          ))}
      </Card>
    </Card>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.any,
  onGetNotifications: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.Notifications.notifications,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onGetNotifications: () => dispatch(getNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
