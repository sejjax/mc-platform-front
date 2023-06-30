import React from 'react';

import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
import { useLocation, withRouter } from 'react-router-dom';
import { Button, Col, Container, Form, Label, Row } from 'reactstrap';
// Formik Validation
import * as Yup from 'yup';

import authService from 'services/authService';

import PasswordInput from 'components/Custom/passwordInput';

import { t } from '../../i18n';
import FullScreenLogo from './FullScreenLogo';

const RecoverPassword = (props) => {
  const location = useLocation();

  const path = location.pathname.split('/');
  const hash = path[path.length - 1];

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, t('common_password_hint_small'))
        .matches(
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
          t('common_password_hint_validation'),
        )
        .required(t('common_password_hint_required')),
      confirmPassword: Yup.string()
        .required(t('common_password_hint_repeat'))
        .oneOf([Yup.ref('password'), null], t('common_password_hint_not_match')),
    }),
    onSubmit: async (values) => {
      const response = await authService.resetPassword(values, hash);

      if (response) {
        props.history.push('/login');
      }
    },
  });

  // const { forgetError, forgetSuccessMsg } = useSelector(state => ({
  //   forgetError: state.ForgetPassword.forgetError,
  //   forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  // }))

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{t('recover_password_meta_title')}</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <FullScreenLogo />

            <Col xl={4} style={{ backgroundColor: '#fff' }}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">{t('auth_recover_password')}</h5>
                        <p className="text-muted">{t('auth_recover_password_text')}</p>
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
                            <Label className="form-label">{t('common_password')}</Label>
                            <PasswordInput
                              name="password"
                              validation={validation}
                              placeholder={t('common_password_placeholder')}
                              invalid={
                                !!(validation.touched.password && validation.errors.password)
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">
                              {t('auth_recover_password_confirm_password')}
                            </Label>
                            <PasswordInput
                              name="confirmPassword"
                              validation={validation}
                              placeholder={t('common_password_placeholder')}
                              invalid={
                                !!(validation.touched.password && validation.errors.password)
                              }
                            />
                          </div>
                          <div className="mt-3 text-end">
                            <Button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit">
                              {t('common_restore')}
                            </Button>
                          </div>
                        </Form>
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

RecoverPassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RecoverPassword);
