import MetaTags from "react-meta-tags"
import React, { useState, useRef, useMemo } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"
import { useFormik } from "formik"
import countries from "constants/countries"
import Select from "react-select"
import { useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import blankAvatar from "../../assets/images/blankProfile.png"
import { editProfile, uploadPhotoError } from "../../store/actions"
import PasswordInput from "components/Custom/passwordInput"
import schema from "yupshema/editProfile"
import "./scss/profile.scss"
import PhotoEditorModal from "components/DepositModals/PhotoEditor/PhotoEditorModal"
import WhiteListImages from "helpers/WhiteListImages"
import getImageReader from "helpers/GetImageReader"
import ChangeDefaultWalletProfile from "./components/Profile/ChangeDefaultWalletProfile"
import { useEffect } from "react"

const UserProfile = () => {
  const dispatch = useDispatch()

  const [isFileUpload, setFileUpload] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoType, setPhotoType] = useState(null)

  let fileInputRef = useRef(null)

  const handleFileChange = async e => {
    const file = e.target.files[0]

    if (file) {
      if (!WhiteListImages.includes(file?.type)) {
        return dispatch(uploadPhotoError("Некорректный формат изображения"))
      }

      const result = await getImageReader(file)

      if (result) {
        setPhotoPreview(result)
        setPhotoType(file?.type)
        setFileUpload(true)
        setOpenModal(true)
      }
    }
  }

  const [openModal, setOpenModal] = useState(false)

  const { error, success, errorUpload, successUpload, photo } = useSelector(
    state => ({
      error: state.Profile.error,
      success: state.Profile.success,
      errorUpload: state.PhotoUpload.error,
      successUpload: state.PhotoUpload.upload,
      photo: state.Photo.photo,
    })
  )
  const { partnerId, email, fullName, country, mobile, agreement } =
    useSelector(state => state.Profile.user)

  const isOpenModal = useMemo(
    () => isFileUpload && openModal,
    [isFileUpload, openModal]
  )

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      fullName: fullName || "",
      country: countries[0]?.options?.find(({ value }) => value === country),
      mobile: mobile || "",
      agreement: agreement === 1 ? true : false,
    },
    validationSchema: schema,

    onSubmit: values => {
      dispatch(editProfile({ ...values, agreement: values.agreement ? 1 : 0 }))
      setPhotoPreview("")
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Профиль пользователя MCapital</title>
        </MetaTags>
        <Container fluid>
          <Card>
            <CardBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col md={12} lg={6}>
                    <Col xl={6} lg={10}>
                      <div className="form-group">
                        <div
                          style={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "1fr 5fr",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <img
                              src={
                                photoPreview
                                  ? photoPreview
                                  : photo
                                  ? photo
                                  : blankAvatar
                              }
                              alt={`${fullName} photo`}
                              className="avatar-md rounded-circle"
                            />
                          </div>
                          <div style={{ marginLeft: "24px" }}>
                            <div className="text-muted">
                              <Label className="form-label">Ваше имя</Label>
                              <Input
                                name="fullName"
                                className="form-control"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.fullName || ""}
                                invalid={
                                  validation.touched.fullName &&
                                  validation.errors.fullName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.username &&
                              validation.errors.fullName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.fullName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <input
                          hidden={true}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                        <Button
                          style={{ width: "100%" }}
                          type="button"
                          color="primary"
                          onClick={e => {
                            e.preventDefault()
                            fileInputRef.current.click()
                          }}
                        >
                          {photo ? "Изменить фото" : "Добавить фото"}
                        </Button>
                        <PhotoEditorModal
                          toggle={setOpenModal}
                          isOpen={isOpenModal}
                          photo={photoPreview}
                          photoType={photoType}
                          setPhotoPreview={setPhotoPreview}
                        />

                        {successUpload ? (
                          <Alert color="success" className="mt-3">
                            Фото успешно загружено.
                          </Alert>
                        ) : null}
                        {errorUpload ? (
                          <Alert color="danger" className="mt-3">
                            {errorUpload}
                          </Alert>
                        ) : null}
                      </div>
                      <Row className="mt-4">
                        <Col lg={6}>
                          <div className="form-group">
                            <span>Реферальный ID</span>
                            <div className="font-size-18 font-weight-600 mt-1">
                              {partnerId}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="form-group mt-4">
                        <Label className="form-label" htmlFor="email">
                          Email
                        </Label>
                        <Input
                          name="email"
                          className="form-control"
                          value={email}
                          disabled
                        />
                      </div>
                      <div className="form-group mt-4">
                        <Label className="form-label" htmlFor="country">
                          Страна
                        </Label>
                        <Select
                          id="country"
                          placeholder="Выберите страну"
                          name="country"
                          value={validation.values.country || "Выберите страну"}
                          onChange={value =>
                            validation.setFieldValue("country", value)
                          }
                          onBlur={validation.handleBlur}
                          options={countries}
                          invalid={!!validation.errors.country}
                        />
                        {validation.errors.country && (
                          <FormFeedback type="invalid" className="select__form_feedback">
                            {validation.errors.country?.value ??
                              validation.errors.country?.label}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="form-group mt-4">
                        <Label className="form-label" htmlFor="country">
                          Номер телефона
                        </Label>
                        <Input
                          name="mobile"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile || ""}
                          invalid={
                            validation.touched.mobile &&
                            validation.errors.mobile
                              ? true
                              : false
                          }
                        />
                        {validation.touched.mobile &&
                        validation.errors.mobile ? (
                          <FormFeedback type="invalid">
                            {validation.errors.mobile}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="form-group mt-4 mb-5">
                        <Label className="form-label" htmlFor="country">
                          Адрес кошелька по умолчанию
                        </Label>
                        {/* <Input
                          name="
                          default_wallet_address"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.default_wallet_address || ""}
                          invalid={
                            validation.touched.default_wallet_address &&
                            validation.errors.default_wallet_address
                              ? true
                              : false
                          }
                        /> */}
                        <ChangeDefaultWalletProfile />
                        {/* {validation.touched.default_wallet_address &&
                        validation.errors.default_wallet_address ? (
                          <formfeedback type="invalid">
                            {validation.errors.default_wallet_address}
                          </formfeedback>
                        ) : null} */}
                      </div>
                    </Col>
                  </Col>
                  <Col lg={6}>
                    <Col xl={6} lg={10}>
                      <h3 className="font-size-20">Изменить пароль</h3>
                      <div className="mt-5">
                        <Label className="form-label" htmlFor="oldPassword">
                          Старый пароль
                        </Label>
                        <PasswordInput
                          name="oldPassword"
                          validation={validation}
                          placeholder="Введите старый пароль"
                          invalid={
                            validation.touched.oldPassword &&
                            validation.errors.oldPassword
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <Label className="form-label" htmlFor="password">
                          Новый пароль
                        </Label>
                        <PasswordInput
                          name="password"
                          validation={validation}
                          placeholder="Введите новый пароль"
                          invalid={validation.errors.password ? true : false}
                        />
                      </div>
                      <div className="mt-3">
                        <Label className="form-label" htmlFor="confirmPassword">
                          Подтвердите новый пароль
                        </Label>
                        <PasswordInput
                          name="confirmPassword"
                          validation={validation}
                          placeholder="Подтвердите новый пароль"
                          invalid={
                            validation.errors.confirmPassword ? true : false
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <Label className="form-label">
                          <Input
                            name="agreement"
                            type="checkbox"
                            checked={validation.values.checked}
                            onChange={validation.handleChange}
                          />{" "}
                          Согласен показывать личную информацию вышестоящим
                          партнерам
                        </Label>
                      </div>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Col xl={6} lg={10}>
                      {success ? (
                        <Alert color="success">Профиль успешно обновлён.</Alert>
                      ) : null}

                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mt-5">
                        <Button
                          style={{ width: "100%" }}
                          type="submit"
                          color="primary"
                        >
                          Сохранить изменения
                        </Button>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
