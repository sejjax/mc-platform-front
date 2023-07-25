import React, { useEffect, useMemo } from 'react';

// Formik Validation
import { useFormik } from 'formik';
import withAuthRedirect from 'hocs/withAuthRedirect';
import PropTypes from 'prop-types';
// recaptcha
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import MetaTags from 'react-meta-tags';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Alert, Col, Container, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import registerSchema from 'yupshema/registerSchema';

import PasswordInput from 'components/Custom/passwordInput';
import ReCaptcha from 'components/Verification/ReCaptcha';

// import country list
import countries from 'constants/countries';

import useTranslation from '../../hooks/useTranslation';
// action
import { apiError, registerUser } from '../../store/actions';
import DisplayReferralName from './DisplayReferralName';
// import images
import FullScreenLogo from './FullScreenLogo.jsx';

const Register = (props) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const t = useTranslation();

  const partnerId = new URLSearchParams(search).get('partner_id');

  const generatedPassword = useMemo(() => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 12;

    const isPasswordContainsChars = (chars, password) => {
      for (const char of chars) {
        if (password.includes(char)) return true;
      }
      return false;
    };

    const checkPassword = (password) => {
      const specialChars = '!@#$%^&*()';
      const isPasswordContainsSpecialChars = isPasswordContainsChars(specialChars, password);
      const numberChars = '1234567890';

      const isPasswordContainsNumbersChars = isPasswordContainsChars(numberChars, password);

      const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const isPasswordContainsUpperChars = isPasswordContainsChars(upperChars, password);
      const normalChars = 'abcdefghijklmnopqrstuvwxyz';
      const isPasswordContainsNormalChars = isPasswordContainsChars(normalChars, password);
      if (
        isPasswordContainsSpecialChars &&
        isPasswordContainsNumbersChars &&
        isPasswordContainsUpperChars &&
        isPasswordContainsNormalChars
      )
        return true;
      return false;
    };

    const generatePassword = () => {
      let password = '';
      for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      return password;
    };

    let password, isPasswordValid;

    do {
      password = generatePassword();
      isPasswordValid = checkPassword(password);
    } while (!isPasswordValid);
    return password;
  }, []);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: false,

    initialValues: {
      referrerId: partnerId ?? 'HF7LTH',
      agreement: true,
      email: '',
      password: generatedPassword,
      fullName: '',
      mobile: '',
      country: '',
      confirmPassword: generatedPassword,
      // recaptcha: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      dispatch(
        registerUser(
          {
            ...values,
            email: values.email.toLowerCase(),
            agreement: values.agreement ? 1 : 0,
            mobile: values.mobile ? values.mobile : null,
          },
          props.history,
        ),
      );
    },
  });

  const { registerSuccessful, registrationError, loading } = useSelector((state) => ({
    registerSuccessful: state.Account.registerSuccessful,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  useEffect(() => {
    dispatch(apiError(''));
  }, []);

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{t('auth_register_meta_title')}</title>
        </MetaTags>
        <Container
          fluid
          className="p-0"
          style={{ backgroundColor: '#fff', height: '100vh', display: 'flex' }}>
          <Row className="g-0">
            <FullScreenLogo />

            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">{t('auth_register')}</h5>
                        <p className="text-muted">{t('auth_register_fill_form')}</p>
                      </div>
                      <div className="mt-4">
                        <GoogleReCaptchaProvider
                          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
                          render="explicit">
                          <ReCaptcha
                            action="register"
                            onVerify={(token) => {
                              validation.setFieldValue('recaptcha', token);
                            }}>
                            {({ handleReCaptchaVerify }) => {
                              return (
                                <Form
                                  className="form-horizontal"
                                  onSubmit={async (e) => {
                                    e.preventDefault();
                                    await handleReCaptchaVerify();
                                    validation.handleSubmit();
                                    return false;
                                  }}>
                                  {typeof registrationError === 'string' && (
                                    <Alert color="danger">{registrationError}</Alert>
                                  )}
                                  <div
                                    className="mb-3"
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '1fr 1fr',
                                      gap: '10px',
                                      width: '100%',
                                    }}>
                                    <div>
                                      <Label className="form-label" htmlFor="referrerId">
                                        {t('auth_register_inviter_id')}
                                      </Label>
                                      <Input
                                        name="referrerId"
                                        placeholder={t('auth_register_inviter_placeholder')}
                                        className="form-control"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.referrerId || ''}
                                        invalid={
                                          !!(
                                            (validation.touched.referrerId &&
                                              validation.errors.referrerId) ||
                                            (registrationError && registrationError.referrerId)
                                          )
                                        }
                                      />
                                      {(validation.touched.referrerId &&
                                        validation.errors.referrerId) ||
                                      (registrationError && registrationError.referrerId) ? (
                                        <FormFeedback type="invalid">
                                          {t('auth_register_inviter_error')}
                                        </FormFeedback>
                                      ) : null}
                                      <DisplayReferralName
                                        referralId={validation.values.referrerId}
                                        setError={validation.setFieldError}
                                        setTouched={validation.setFieldTouched}
                                      />
                                    </div>
                                    <div>
                                      <Label className="form-label" htmlFor="fullName">
                                        {t('auth_register_full_name')}
                                      </Label>
                                      <Input
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                        placeholder={t('auth_register_full_name_placeholder')}
                                        onChange={validation.handleChange}
                                        value={validation.values.fullName || ''}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          !!(
                                            (validation.touched.fullName &&
                                              validation.errors.fullName) ||
                                            (registrationError && registrationError.fullName)
                                          )
                                        }
                                      />
                                      {(validation.touched.fullName &&
                                        validation.errors.fullName) ||
                                      (registrationError && registrationError.fullName) ? (
                                        <FormFeedback type="invalid">
                                          {t('common_field_error')}
                                        </FormFeedback>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <Label className="form-label" htmlFor="email">
                                      {t('common_email')}
                                    </Label>
                                    <Input
                                      id="email"
                                      name="email"
                                      className="form-control"
                                      placeholder={t('common_email_placeholder')}
                                      type="email"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.email || ''}
                                      invalid={
                                        !!(
                                          (validation.touched.email && validation.errors.email) ||
                                          (registrationError && registrationError.email)
                                        )
                                      }
                                    />
                                    {(validation.touched.email && validation.errors.email) ||
                                    (registrationError && registrationError.email) ? (
                                      <FormFeedback type="invalid">
                                        {t('common_email_error')}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label className="form-label" htmlFor="country">
                                      {t('auth_register_choose_country')}
                                    </Label>
                                    <Select
                                      id="country"
                                      placeholder={t('auth_register_choose_country_placeholder')}
                                      name="country"
                                      value={
                                        validation.values.country ||
                                        t('auth_register_choose_country')
                                      }
                                      onChange={(value) =>
                                        validation.setFieldValue('country', value)
                                      }
                                      // onBlur={validation.handleBlur}
                                      options={countries(t)}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Label className="form-label" htmlFor="mobile">
                                      {t('common_phone_number')}
                                    </Label>
                                    <Input
                                      id="mobile"
                                      name="mobile"
                                      type="text"
                                      placeholder={t('common_phone_number_placeholder')}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.mobile || ''}
                                      invalid={
                                        !!(
                                          (validation.touched.mobile && validation.errors.mobile) ||
                                          (registrationError && registrationError.mobile)
                                        )
                                      }
                                    />
                                    {(validation.touched.mobile && validation.errors.mobile) ||
                                    (registrationError && registrationError.mobile) ? (
                                      <FormFeedback type="invalid">
                                        {t('common_phone_number_error')}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label className="form-label" htmlFor="password">
                                      {t('common_password')}
                                    </Label>
                                    <PasswordInput
                                      showPassword={true}
                                      name="password"
                                      validation={validation}
                                      placeholder={t('common_password_placeholder')}
                                      invalid={
                                        !!(
                                          validation.touched.password && validation.errors.password
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Label className="form-label" htmlFor="confirmPassword">
                                      {t('auth_register_repeat_password')}
                                    </Label>
                                    <PasswordInput
                                      showPassword={true}
                                      name="confirmPassword"
                                      validation={validation}
                                      placeholder={t('auth_register_repeat_password_placeholder')}
                                      invalid={
                                        !!(
                                          validation.touched.confirmPassword &&
                                          validation.errors.confirmPassword
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Label className="form-label">
                                      <Input
                                        name="agreement"
                                        type="checkbox"
                                        checked={validation.values.agreement}
                                        onChange={validation.handleChange}
                                      />{' '}
                                      {t('auth_register_agree_checkbox_label')}
                                    </Label>
                                  </div>
                                  <div>
                                    {/* <p className="mb-0">
                                By registering you agree to the TGT Foundation
                                <a href="#" className="text-primary">
                                  Terms of Use
                                </a>
                              </p> */}
                                  </div>
                                  <div className="mb-3">
                                    <Input
                                      id="recaptcha"
                                      name="recaptcha"
                                      type="hidden"
                                      onChange={validation.handleChange}
                                      value={validation.values.recaptcha || ''}
                                      invalid={
                                        !!(
                                          validation.touched.recaptcha &&
                                          validation.errors.recaptcha
                                        )
                                      }
                                    />
                                    {validation.touched.recaptcha && validation.errors.recaptcha ? (
                                      <FormFeedback type="invalid">
                                        {t('auth_register_recaptcha_error')}
                                      </FormFeedback>
                                    ) : null}
                                  </div>

                                  {registerSuccessful && registerSuccessful && (
                                    <Alert color="success">{t('auth_register_successful')}</Alert>
                                  )}
                                  <div className="mt-4">
                                    <button
                                      className="btn btn-primary btn-block "
                                      type="submit"
                                      disabled={loading}>
                                      {t('auth_register')}
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </ReCaptcha>
                        </GoogleReCaptchaProvider>
                        <div className="mt-5 text-center">
                          <p>
                            {t('auth_register_have_account')}{' '}
                            <Link to="login" className="font-weight-medium text-primary">
                              {t('auth_register_login')}
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

Register.propTypes = {
  history: PropTypes.object,
};

export default withAuthRedirect(Register);
