import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"
import {
  Row,
  Col,
  Button,
  Container,
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { userForgetPassword } from "../../store/actions"

import FullScreenLogo from "./FullScreenLogo"

// import images

const ForgetPasswordPage = props => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Пожалуйста введите email"),
    }),
    onSubmit: values => {
      dispatch(userForgetPassword(values, props.history))
    },
  })

  const { forgetError, forgetSuccessMsg } = useSelector(state => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }))

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Восстановление пароля</title>
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
                        <h5 className="text-primary">Сброс пароля</h5>
                        <p className="text-muted">
                          Для восстановления пароля введите email
                        </p>
                      </div>
                      <div>
                        {forgetError && (
                          <Alert color="danger">{forgetError}</Alert>
                        )}

                        {forgetSuccessMsg && (
                          <Alert color="success">
                            Мы отправляем письмо на ваш почтовый ящик,
                            пожалуйста, проверьте его и следуйте инструкциям.
                          </Alert>
                        )}
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
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mt-3 text-end">
                            <Button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Сбросить
                            </Button>
                          </div>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Вспомнили пароль?{" "}
                            <Link to="login" className="fw-medium text-primary">
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
