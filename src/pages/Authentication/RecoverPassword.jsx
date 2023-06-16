import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"
import { Row, Col, Button, Container, Label, Form } from "reactstrap"

import PasswordInput from "components/Custom/passwordInput"

import { withRouter, useLocation } from "react-router-dom"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

import FullScreenLogo from "./FullScreenLogo"
import authService from "services/authService"

const RecoverPassword = props => {
  const location = useLocation()

  const path = location.pathname.split("/")
  const hash = path[path.length - 1]

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Пароль слишком короткий — минимум 8 символов.")
        .matches(
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
          "Пароль должен  содержать 8 символов, один в верхнем регистре, один в нижнем регистре, одну цифру и один символ специального регистра"
        )
        .required("Пожалуйста введите пароль"),
      confirmPassword: Yup.string()
        .required("Пожалуйста повторите пароль")
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
    }),
    onSubmit: async values => {
      const response = await authService.resetPassword(values, hash)

      if (response) {
        props.history.push("/login")
      }
    },
  })

  // const { forgetError, forgetSuccessMsg } = useSelector(state => ({
  //   forgetError: state.ForgetPassword.forgetError,
  //   forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  // }))

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Восстановление пароля</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <FullScreenLogo />

            <Col xl={4} style={{ backgroundColor: "#fff" }}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Сброс пароля</h5>
                        <p className="text-muted">Сброс пароля MCapital.</p>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Пароль</Label>
                            <PasswordInput
                              name="password"
                              validation={validation}
                              placeholder="Введите пароль"
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">
                              Подтверждение пароля
                            </Label>
                            <PasswordInput
                              name="confirmPassword"
                              validation={validation}
                              placeholder="Введите пароль"
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                          </div>
                          <div className="mt-3 text-end">
                            <Button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Восстановить
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
  )
}

RecoverPassword.propTypes = {
  history: PropTypes.object,
}

export default withRouter(RecoverPassword)
