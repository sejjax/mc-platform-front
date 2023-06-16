import React from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import {
  Col,
  Container,
  Form,
  Row,
  Input,
  Label,
  FormFeedback,
  Alert,
} from "reactstrap"
import FullScreenLogo from "./FullScreenLogo"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useSelector, useDispatch } from "react-redux"
import { loginUser } from "../../store/actions"

import PasswordInput from "../../components/Custom/passwordInput"

import withAuthRedirect from "hocs/withAuthRedirect"

const Login = props => {
  const dispatch = useDispatch()
  const validation = useFormik({
    enableReinitialize: false,

    initialValues: {
      identifier: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required("Введите Email"),
      password: Yup.string().required("Введите пароль"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.history))
    },
  })

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title> Вход в личный кабинет MCapital </title>
        </MetaTags>
        <Container
          fluid
          className="p-0"
          style={{
            backgroundColor: "#fff",
            height: "100vh",
            display: "flex",
            width: "100%",
          }}
        >
          <Row className="g-0 w-100">
            <FullScreenLogo />

            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Добро Пожаловать!</h5>
                        <p className="text-muted">Войдите в платформу</p>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                          }}
                        >
                          {error ? <Alert color="danger">{error}</Alert> : null}

                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="identifier"
                              className="form-control"
                              placeholder="Введите Email"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.identifier || ""}
                              invalid={
                                validation.touched.identifier &&
                                validation.errors.identifier
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.identifier &&
                            validation.errors.identifier ? (
                              <FormFeedback type="invalid">
                                {validation.errors.identifier}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Label className="form-label" htmlFor="password">
                                Пароль
                              </Label>
                              <Link to="/forgot-password">
                                <span style={{ color: "gray" }}>
                                  Забыли пароль?
                                </span>
                              </Link>
                            </div>

                            <PasswordInput
                              validation={validation}
                              name="password"
                              placeholder="Введите Пароль"
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
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
                            <label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Запомнить меня
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              Войти
                            </button>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p>
                            Нет аккаунта?
                            <Link
                              to="register"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Зарегистрируйтесь
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

Login.propTypes = {
  history: PropTypes.object,
}

export default withAuthRedirect(Login)
