import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import withAuthRedirect from 'hocs/withAuthRedirect';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Col, Container, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import * as Yup from 'yup';

import PasswordInput from '../../components/Custom/passwordInput';

import { t } from '../../i18n';
import { loginUser } from '../../store/actions';
import FullScreenLogo from './FullScreenLogo';

const Login = (props) => {
  const dispatch = useDispatch();
  const validation = useFormik({
    enableReinitialize: false,

    initialValues: {
      identifier: '',
      password: '',
      rememberMe: true,
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required(t('common_email_hint')),
      password: Yup.string().required(t('common_password_hint')),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    },
  });

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  // const fetchCredentialsFromWebView = () => {
  //   const data = { action: 'get_credentials' };
  //   const message = JSON.stringify(data);
  //   window.postMessage(message);
  // };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.username && data.password) {
        validation.setFieldValue('identifier', data.username);
        validation.setFieldValue('password', data.password);
      }
    } catch (error) {
      console.log('Error parsing message data:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleWebViewMessage);
    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('message', handleWebViewMessage);
    };
  }, [handleWebViewMessage]);

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{t('auth_login_meta_title')}</title>
        </MetaTags>
        <Container
          fluid
          className="p-0"
          style={{
            backgroundColor: '#fff',
            height: '100vh',
            display: 'flex',
            width: '100%',
          }}>
          <Row className="g-0 w-100">
            <FullScreenLogo />

            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">{t('auth_login_welcome')}</h5>
                        <p className="text-muted">{t('auth_enter_platform')}</p>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                          }}>
                          {error ? <Alert color="danger">{`${t(error)}`}</Alert> : null}

                          <div className="mb-3">
                            <Label className="form-label">{`${t('common_email')}`}</Label>
                            <Input
                              name="identifier"
                              className="form-control"
                              placeholder={`${t('common_email_placeholder')}`}
                              type="text"
                              id="username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.identifier || ''}
                              invalid={
                                !!(validation.touched.identifier && validation.errors.identifier)
                              }
                            />
                            {validation.touched.identifier && validation.errors.identifier ? (
                              <FormFeedback type="invalid">
                                {validation.errors.identifier}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}>
                              <Label className="form-label" htmlFor="password">
                                {`${t('common_password')}`}
                              </Label>
                              <Link to="/forgot-password">
                                <span style={{ color: 'gray' }}>{t('auth_forgot_password')}</span>
                              </Link>
                            </div>

                            <PasswordInput
                              validation={validation}
                              name="password"
                              id="password"
                              placeholder={`${t('common_password_placeholder')}`}
                              invalid={
                                !!(validation.touched.password && validation.errors.password)
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="auth-remember-check"
                              name="rememberMe"
                              checked={validation.values.rememberMe}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            />
                            <label className="form-check-label" htmlFor="auth-remember-check">
                              {`${t('auth_login_remember_me')}`}
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                              id="loginButton">
                              {t('auth_login')}
                            </button>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p>
                            {t('auth_login_no_account')}
                            <Link to="register" className="fw-medium text-primary">
                              {' '}
                              {t('auth_login_register')}
                            </Link>
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

Login.propTypes = {
  history: PropTypes.object,
};

export default withAuthRedirect(Login);
