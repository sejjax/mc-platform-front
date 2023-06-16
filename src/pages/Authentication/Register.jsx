import React, { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"
import Select from "react-select"
// Formik Validation

import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

// recaptcha
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import ReCaptcha from "components/Verification/ReCaptcha"

// import images

import FullScreenLogo from "./FullScreenLogo.jsx"
import PasswordInput from "components/Custom/passwordInput"

// import country list
import countries from "constants/countries"
import registerSchema from "yupshema/registerSchema"
import DisplayReferralName from "./DisplayReferralName"
import withAuthRedirect from "hocs/withAuthRedirect"

const Register = props => {
  const dispatch = useDispatch()
  const { search } = useLocation()

  const partnerId = new URLSearchParams(search).get("partner_id")

  const generatedPassword = useMemo(() => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const passwordLength = 12

    const isPasswordContainsChars = (chars, password) => {
      for (const char of chars) {
        if (password.includes(char)) return true
      }
      return false
    }

    const checkPassword = password => {
      const specialChars = "!@#$%^&*()"
      const isPasswordContainsSpecialChars = isPasswordContainsChars(
        specialChars,
        password
      )
      const numberChars = "1234567890"

      const isPasswordContainsNumbersChars = isPasswordContainsChars(
        numberChars,
        password
      )

      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      const isPasswordContainsUpperChars = isPasswordContainsChars(
        upperChars,
        password
      )
      const normalChars = "abcdefghijklmnopqrstuvwxyz"
      const isPasswordContainsNormalChars = isPasswordContainsChars(
        normalChars,
        password
      )
      if (
        isPasswordContainsSpecialChars &&
        isPasswordContainsNumbersChars &&
        isPasswordContainsUpperChars &&
        isPasswordContainsNormalChars
      )
        return true
      return false
    }

    const generatePassword = () => {
      let password = ""
      for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
      }
      return password
    }

    let password, isPasswordValid

    do {
      password = generatePassword()
      isPasswordValid = checkPassword(password)
    } while (!isPasswordValid)
    return password
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: false,

    initialValues: {
      referrerId: partnerId ?? "HF7LTH",
      agreement: true,
      email: "",
      password: generatedPassword,
      fullName: "",
      mobile: "",
      country: "",
      confirmPassword: generatedPassword,
      // recaptcha: "",
    },

    validationSchema: registerSchema,

    onSubmit: async values => {
      dispatch(
        registerUser(
          {
            ...values,
            email: values.email.toLowerCase(),
            agreement: values.agreement ? 1 : 0,
            mobile: values.mobile ? values.mobile : null,
          },
          props.history
        )
      )
    },
  })

  const { registerSuccessful, registrationError, loading } = useSelector(
    state => ({
      registerSuccessful: state.Account.registerSuccessful,
      registrationError: state.Account.registrationError,
      loading: state.Account.loading,
    })
  )

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Регистрация MCapital</title>
        </MetaTags>
        <Container
          fluid
          className="p-0"
          style={{ backgroundColor: "#fff", height: "100vh", display: "flex" }}
        >
          <Row className="g-0">
            <FullScreenLogo />

            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Зарегистрироваться</h5>
                        <p className="text-muted">
                          Заполните форму регистрации для получения учетной
                          записи на платформе.
                        </p>
                      </div>
                      <div className="mt-4">
                        <GoogleReCaptchaProvider
                          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
                          render="explicit"
                        >
                          <ReCaptcha
                            action="register"
                            onVerify={token => {
                              validation.setFieldValue("recaptcha", token)
                            }}
                          >
                            {({ handleReCaptchaVerify }) => {
                              return (
                                <Form
                                  className="form-horizontal"
                                  onSubmit={async e => {
                                    e.preventDefault()
                                    await handleReCaptchaVerify()
                                    validation.handleSubmit()
                                    return false
                                  }}
                                >
                                  {typeof registrationError === "string" && (
                                    <Alert color="danger">
                                      {registrationError}
                                    </Alert>
                                  )}
                                  <div
                                    className="mb-3"
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "1fr 1fr",
                                      gap: "10px",
                                      width: "100%",
                                    }}
                                  >
                                    <div>
                                      <Label
                                        className="form-label"
                                        htmlFor="referrerId"
                                      >
                                        ID Пригласителя
                                      </Label>
                                      <Input
                                        name="referrerId"
                                        placeholder="Введите ID пригласителя если есть"
                                        className="form-control"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={
                                          validation.values.referrerId || ""
                                        }
                                        invalid={
                                          (validation.touched.referrerId &&
                                            validation.errors.referrerId) ||
                                          (registrationError &&
                                            registrationError.referrerId)
                                            ? true
                                            : false
                                        }
                                      />
                                      {(validation.touched.referrerId &&
                                        validation.errors.referrerId) ||
                                      (registrationError &&
                                        registrationError.referrerId) ? (
                                        <FormFeedback type="invalid">
                                          Указанный пригласитель не найден
                                        </FormFeedback>
                                      ) : null}
                                      <DisplayReferralName
                                        referralId={
                                          validation.values.referrerId
                                        }
                                        setError={validation.setFieldError}
                                        setTouched={validation.setFieldTouched}
                                      />
                                    </div>
                                    <div>
                                      <Label
                                        className="form-label"
                                        htmlFor="fullName"
                                      >
                                        Ваше имя и фамилия
                                      </Label>
                                      <Input
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                        placeholder="Введите полное имя"
                                        onChange={validation.handleChange}
                                        value={validation.values.fullName || ""}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                          (validation.touched.fullName &&
                                            validation.errors.fullName) ||
                                          (registrationError &&
                                            registrationError.fullName)
                                            ? true
                                            : false
                                        }
                                      />
                                      {(validation.touched.fullName &&
                                        validation.errors.fullName) ||
                                      (registrationError &&
                                        registrationError.fullName) ? (
                                        <FormFeedback type="invalid">
                                          Поле заполнено некорректно
                                        </FormFeedback>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <Label
                                      className="form-label"
                                      htmlFor="email"
                                    >
                                      Email
                                    </Label>
                                    <Input
                                      id="email"
                                      name="email"
                                      className="form-control"
                                      placeholder="Введите ваш email"
                                      type="email"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.email || ""}
                                      invalid={
                                        (validation.touched.email &&
                                          validation.errors.email) ||
                                        (registrationError &&
                                          registrationError.email)
                                          ? true
                                          : false
                                      }
                                    />
                                    {(validation.touched.email &&
                                      validation.errors.email) ||
                                    (registrationError &&
                                      registrationError.email) ? (
                                      <FormFeedback type="invalid">
                                        Поле email заполнено некорректно
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label
                                      className="form-label"
                                      htmlFor="country"
                                    >
                                      Выберите страну
                                    </Label>
                                    <Select
                                      id="country"
                                      placeholder="Выберите вашу страну"
                                      name="country"
                                      value={
                                        validation.values.country ||
                                        "Выберите страну"
                                      }
                                      onChange={value =>
                                        validation.setFieldValue(
                                          "country",
                                          value
                                        )
                                      }
                                      // onBlur={validation.handleBlur}
                                      options={countries}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Label
                                      className="form-label"
                                      htmlFor="mobile"
                                    >
                                      Номер телефона
                                    </Label>
                                    <Input
                                      id="mobile"
                                      name="mobile"
                                      type="text"
                                      placeholder="Введите номер телефона"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.mobile || ""}
                                      invalid={
                                        (validation.touched.mobile &&
                                          validation.errors.mobile) ||
                                        (registrationError &&
                                          registrationError.mobile)
                                          ? true
                                          : false
                                      }
                                    />
                                    {(validation.touched.mobile &&
                                      validation.errors.mobile) ||
                                    (registrationError &&
                                      registrationError.mobile) ? (
                                      <FormFeedback type="invalid">
                                        Телефон заполнен некорректно
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                  <div className="mb-3">
                                    <Label
                                      className="form-label"
                                      htmlFor="password"
                                    >
                                      Пароль
                                    </Label>
                                    <PasswordInput
                                      showPassword={true}
                                      name="password"
                                      validation={validation}
                                      placeholder="Введите Пароль"
                                      invalid={
                                        validation.touched.password &&
                                        validation.errors.password
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Label
                                      className="form-label"
                                      htmlFor="confirmPassword"
                                    >
                                      Повторите пароль
                                    </Label>
                                    <PasswordInput
                                      showPassword={true}
                                      name="confirmPassword"
                                      validation={validation}
                                      placeholder="Повторите пароль"
                                      invalid={
                                        validation.touched.confirmPassword &&
                                        validation.errors.confirmPassword
                                          ? true
                                          : false
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
                                      />{" "}
                                      Согласен показывать личную информацию
                                      вышестоящим партнерам
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
                                      value={validation.values.recaptcha || ""}
                                      invalid={
                                        validation.touched.recaptcha &&
                                        validation.errors.recaptcha
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.touched.recaptcha &&
                                    validation.errors.recaptcha ? (
                                      <FormFeedback type="invalid">
                                        Капча заполнена некорректно
                                      </FormFeedback>
                                    ) : null}
                                  </div>

                                  {registerSuccessful && registerSuccessful && (
                                    <Alert color="success">
                                      Регистрация прошла успешно, мы отправили
                                      письмо в ваш почтовый ящик. Пожалуйста,
                                      подтвердите email.
                                    </Alert>
                                  )}
                                  <div className="mt-4">
                                    <button
                                      className="btn btn-primary btn-block "
                                      type="submit"
                                      disabled={loading}
                                    >
                                      Зарегистрироваться
                                    </button>
                                  </div>
                                </Form>
                              )
                            }}
                          </ReCaptcha>
                        </GoogleReCaptchaProvider>
                        <div className="mt-5 text-center">
                          <p>
                            Уже есть аккаунт?{" "}
                            <Link
                              to="login"
                              className="font-weight-medium text-primary"
                            >
                              Войдите здесь
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
  )
}

Register.propTypes = {
  history: PropTypes.object,
}

export default withAuthRedirect(Register)
