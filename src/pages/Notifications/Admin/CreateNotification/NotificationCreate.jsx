import React, { useState } from 'react';
import { useEffect } from 'react';

import { useFormik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';

import {
  getNotificationsTypeRequest,
  getOneNotificationRequest,
} from 'services/notificationsService';
import { addNotification, editNotification } from 'store/actions';

import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import InputWithError from 'components/InputWithError/InputWithError';

import { t } from '../../../../i18n';
import { createNotificationSchema } from './yupSchema';

const CreateNotification = ({ addNotification, editNotification, getNotification, history }) => {
  const { notificationId } = useParams();
  const [notificationTypes, setNotificationTypes] = useState([]);

  const redirectHandler = () => {
    return history.push('/admin/notifications');
  };

  const formik = useFormik({
    validationSchema: createNotificationSchema,
    initialValues: {
      id: null,
      notificationTitle: '',
      notificationType: '',
      notificationMessage: '',
      recipientCategory: 'all',
      notificationDate: '',
      whomNotifySolo: '',
      whomNotifyGroup: '',
      isEmail: false,
      isSite: false,
    },
    onSubmit: (values) => {
      const data = {
        notification_text: values.notificationMessage,
        notification_title: values.notificationTitle,
        isEmail: values.isEmail,
        isSite: values.isSite,
        notification_date: new Date(values.notificationDate).toISOString(),
        notification_type: parseInt(values.notificationType),
      };
      if (values.recipientCategory === 'all') {
        data.whom_notify = ['all'];
      }
      if (values.recipientCategory === 'one') {
        data.whom_notify = [values.whomNotifySolo];
      }
      if (values.recipientCategory === 'group') {
        data.whom_notify = values.whomNotifyGroup.split(',');
      }
      if (values.id) {
        data.id = values.id;
        editNotification({ data, redirectHandler });
      } else {
        addNotification({ data, redirectHandler });
      }
    },
  });

  useEffect(() => {
    const getNotificationsTypes = async () => {
      const data = await getNotificationsTypeRequest();
      setNotificationTypes(data);
    };
    getNotificationsTypes();
  }, []);

  useEffect(() => {
    const setSelectedNotification = async () => {
      if (notificationId && formik.values.id !== notificationId) {
        let selectedNotification = getNotification(+notificationId);
        if (!selectedNotification) {
          selectedNotification = await getOneNotificationRequest(notificationId);
        }
        if (!selectedNotification) return;
        const parsedWhomNotify = JSON.parse(selectedNotification.whom_notify);
        const recipientCategory = parsedWhomNotify.includes('all')
          ? 'all'
          : parsedWhomNotify.length === 1
          ? 'one'
          : 'group';
        formik.setValues({
          recipientCategory,
          id: selectedNotification.id,
          isEmail: selectedNotification.isEmail,
          isSite: selectedNotification.isSite,
          notificationTitle: selectedNotification.notification_title,
          notificationDate: moment(new Date(selectedNotification.notification_date)).format(
            'yyyy-MM-DDThh:mm',
          ),
          notificationMessage: selectedNotification.notification_text,
          notificationType: selectedNotification?.notification_type?.id ?? '',
          whomNotifyGroup: recipientCategory === 'group' ? parsedWhomNotify.join(',') : '',
          whomNotifySolo: recipientCategory === 'one' ? parsedWhomNotify[0].toString() : '',
        });
      }
    };
    setSelectedNotification();
  }, [notificationId]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>
          {formik.values.id ? t('common_editing') : t('common_create')} {t('common_notification')}
        </title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title={t('common_notification')}
          hasBreadcrumbItem={false}
          breadcrumbItem={`${formik.values.id ? t('common_editing') : t('common_create')} ${t(
            'common_notification',
          )}`}
        />
        <Card outline>
          <CardBody className="notification__create_cardbody">
            <div className="notification__create_body_wrapper">
              <div className="notification__create_body">
                <div className="notification__create_body_upper">
                  <FormGroup>
                    <Label>{t('notification_type')}</Label>
                    <InputWithError name="notificationType" formik={formik} type="select">
                      <option value="" disabled>
                        {t('notification_choose_type')}
                      </option>
                      {notificationTypes &&
                        notificationTypes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                    </InputWithError>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('notification_name')}</Label>
                    <InputWithError name="notificationTitle" formik={formik} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Сообщение</Label>
                    <InputWithError
                      name="notificationMessage"
                      formik={formik}
                      className="notification__create_textarea"
                      type="textarea"
                      maxLength={200}
                    />
                    <div className="notification__create_textarea_count">
                      {formik.values.notificationMessage.length || 0} / 200
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('notification_receiver_type')}</Label>
                    <div className="notification__create_category_wrapper d-flex justify-content-between align-items-center">
                      <Label>
                        <Input
                          name="recipientCategory"
                          type="radio"
                          checked={formik.values.recipientCategory === 'all'}
                          value="all"
                          onChange={formik.handleChange}
                        />{' '}
                        Всем
                      </Label>
                      <Label>
                        <Input
                          name="recipientCategory"
                          type="radio"
                          value="one"
                          checked={formik.values.recipientCategory === 'one'}
                          onChange={formik.handleChange}
                        />{' '}
                        Одному
                      </Label>
                      <Label>
                        <Input
                          name="recipientCategory"
                          type="radio"
                          value="group"
                          checked={formik.values.recipientCategory === 'group'}
                          onChange={formik.handleChange}
                        />{' '}
                        Группе
                      </Label>
                    </div>
                    {formik.values?.recipientCategory === 'one' && (
                      <div>
                        <Label>{t('notification_receiver_user_id')}</Label>
                        <InputWithError
                          type="text"
                          formik={formik}
                          name="whomNotifySolo"
                          placeholder={t('common_user_id')}
                        />
                      </div>
                    )}
                    {formik.values?.recipientCategory === 'group' && (
                      // <div>
                      //   <Label>
                      //     Выберите файл CSV со списком ID партнеров, которых
                      //     необходимо уведомить
                      //   </Label>
                      //   <div className="notification__create_file_input_wrapper">
                      //     <Input
                      //       className="notification__create_file_input"
                      //       name="file"
                      //       type="file"
                      //       accept=".csv"
                      //       onChange={e => setFile(e.target.files[0])}
                      //     />
                      //     <div className="notification__create_file_input_front">
                      //       <img src={cloudImg} alt="Облако" />
                      //       <span>
                      //         Перенесите файл сюда или нажмите для выбора
                      //       </span>
                      //     </div>
                      //   </div>
                      // </div>
                      <div>
                        <Label>{t('notification_receiver_users_id')}</Label>
                        <InputWithError
                          name="whomNotifyGroup"
                          placeholder={t('notification_receiver_users_id_placeholder')}
                          formik={formik}
                        />
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('common_date_and_time')}</Label>
                    <Input
                      name="notificationDate"
                      value={formik.values.notificationDate}
                      onChange={formik.handleChange}
                      type="datetime-local"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('notification_delivery_type')}</Label>
                    <div className="d-flex">
                      <Label className="notification__create_checkbox_wrapper d-flex align-items-center">
                        <Input
                          className="notification__create_checkbox"
                          type="checkbox"
                          name="isSite"
                          checked={formik.values.isSite}
                          onChange={formik.handleChange}
                        />
                        <span>{t('common_site')}</span>
                      </Label>
                      <Label className="notification__create_checkbox_wrapper d-flex align-items-center">
                        <Input
                          className="notification__create_checkbox"
                          type="checkbox"
                          name="isEmail"
                          checked={formik.values.isEmail}
                          onChange={formik.handleChange}
                        />
                        <span>{t('common_mail')}</span>
                      </Label>
                    </div>
                  </FormGroup>
                </div>
                <FormGroup>
                  <Button
                    className="notification__create_btn"
                    type="submit"
                    color="primary"
                    onClick={formik.handleSubmit}>
                    {t('common_save')}
                  </Button>
                </FormGroup>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

CreateNotification.propTypes = {
  addNotification: PropTypes.func,
  editNotification: PropTypes.func,
  getNotification: PropTypes.func,
  history: PropTypes.any,
};

const mapStateToProps = (state) => ({
  getNotification: (notificationId) =>
    state.Notifications.notifications.find((item) => item.id === notificationId),
});

const mapDispatchToProps = (dispatch) => ({
  addNotification: (data) => dispatch(addNotification(data)),
  editNotification: (data) => dispatch(editNotification(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateNotification));
