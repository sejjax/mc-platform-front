import React from 'react';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import MetaTags from 'react-meta-tags';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
// Formik Validation
import * as Yup from 'yup';

import { t } from '../../i18n';
// action
import { userForgetPassword } from '../../store/actions';
import FullScreenLogo from './FullScreenLogo';

// import images

const ForgetPasswordPage = (props) => {
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Пожалуйста введите email'),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values, props.history));
    },
  });

  const { forgetError, forgetSuccessMsg } = useSelector((state) => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }));

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{t('recover_password_meta_title')}</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <FullScreenLogo />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">{t('auth_recover_password')}</h5>
                        <p className="text-muted">{t('auth_recover_password_email_placeholder')}</p>
                      </div>
                      <div>
                        {forgetError && <Alert color="danger">{forgetError}</Alert>}

                        {forgetSuccessMsg && (
                          <Alert color="success">{t('auth_recover_password_alert_email')}</Alert>
                        )}
                      </div>
                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}>
                          <div className="mb-3">
                            <Label className="form-label">{t('common_email')}</Label>
                            <Input
                              name="email"
                              className="form-control"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ''}
                              invalid={!!(validation.touched.email && validation.errors.email)}
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mt-3 text-end">
                            <Button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit">
                              {t('common_reset')}
                            </Button>
                          </div>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            <Trans
                              i18nKey="auth_recover_password_remember_password"
                              components={{
                                a: <Link to="login" className="fw-medium text-primary" />,
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
