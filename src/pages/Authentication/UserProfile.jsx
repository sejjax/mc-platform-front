import React, { useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';

import { useFormik } from 'formik';
import getImageReader from 'helpers/GetImageReader';
import WhiteListImages from 'helpers/WhiteListImages';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap';
import schema from 'yupshema/editProfile';

import ChangeDefaultWalletProfile from './components/Profile/ChangeDefaultWalletProfile';
import PasswordInput from 'components/Custom/passwordInput';
import PhotoEditorModal from 'components/DepositModals/PhotoEditor/PhotoEditorModal';

import countries from 'constants/countries';

import blankAvatar from '../../assets/images/blankProfile.png';
import { t } from '../../i18n';
import { editProfile, uploadPhotoError } from '../../store/actions';
import './scss/profile.scss';

const UserProfile = () => {
  const dispatch = useDispatch();

  const [isFileUpload, setFileUpload] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoType, setPhotoType] = useState(null);

  let fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!WhiteListImages.includes(file?.type)) {
        return dispatch(uploadPhotoError('Некорректный формат изображения'));
      }

      const result = await getImageReader(file);

      if (result) {
        setPhotoPreview(result);
        setPhotoType(file?.type);
        setFileUpload(true);
        setOpenModal(true);
      }
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const { error, success, errorUpload, successUpload, photo } = useSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success,
    errorUpload: state.PhotoUpload.error,
    successUpload: state.PhotoUpload.upload,
    photo: state.Photo.photo,
  }));
  const { partnerId, email, fullName, country, mobile, agreement, referrerName } = useSelector(
    (state) => state.Profile.user,
  );

  const isOpenModal = useMemo(() => isFileUpload && openModal, [isFileUpload, openModal]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      fullName: fullName || '',
      country: countries[0]?.options?.find(({ value }) => value === country),
      mobile: mobile || '',
      agreement: agreement === 1,
      oldPassword: '',
      password: '',
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(editProfile({ ...values, agreement: values.agreement ? 1 : 0 }));
      setPhotoPreview('');
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{t('user_profile_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <Card>
            <CardBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}>
                <Row>
                  <Col md={12} lg={6}>
                    <Col xl={6} lg={10}>
                      <div className="form-group">
                        <div
                          style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: '1fr 5fr',
                            gap: '10px',
                          }}>
                          <div>
                            <img
                              src={photoPreview ? photoPreview : photo ? photo : blankAvatar}
                              alt={`${fullName} photo`}
                              className="avatar-md rounded-circle"
                            />
                          </div>
                          <div style={{ marginLeft: '24px' }}>
                            <div className="text-muted">
                              <Label className="form-label">{t('user_profile_name')}</Label>
                              <Input
                                name="fullName"
                                className="form-control"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={String(validation.values.fullName) || ''}
                                invalid={
                                  !!(validation.touched.fullName && validation.errors.fullName)
                                }
                              />
                              {validation.touched.fullName && validation.errors.fullName ? (
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
                          style={{ width: '100%' }}
                          type="button"
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current.click();
                          }}>
                          {photo ? t('user_profile_change_photo') : t('user_profile_add_photo')}
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
                            {t('user_profile_photo_upload_success')}
                          </Alert>
                        ) : null}
                        {errorUpload ? (
                          <Alert color="danger" className="mt-3">
                            {errorUpload}
                          </Alert>
                        ) : null}
                      </div>
                      <Row className="mt-4">
                        <Col lg={12}>
                          <Label className="form-label">
                            {t('user_profile_referrer_info_label')}
                          </Label>
                          <div className="referrer-block">
                            <div>
                              <span>{t('common_name')}</span>
                              <div className="font-size-18 fw-bold">{referrerName}</div>
                            </div>
                            <div>
                              <span>{t('user_profile_referrer_id')}</span>
                              <div className="font-size-18 fw-bold">{partnerId}</div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="form-group mt-4">
                        <Label className="form-label" htmlFor="email">
                          {t('common_email')}
                        </Label>
                        <Input name="email" className="form-control" value={email} disabled />
                      </div>
                      <div className="form-group mt-4">
                        <Label className="form-label" htmlFor="country">
                          {t('common_country')}
                        </Label>
                        <Select
                          id="country"
                          placeholder={t('auth_register_choose_country')}
                          name="country"
                          value={validation.values.country || t('auth_register_choose_country')}
                          onChange={(value) => validation.setFieldValue('country', value)}
                          onBlur={validation.handleBlur}
                          options={countries}
                          invalid={!!validation.errors.country}
                        />
                        {validation.errors.country && (
                          <FormFeedback type="invalid" className="select__form_feedback">
                            {validation.errors.country?.value ?? validation.errors.country?.label}
                          </FormFeedback>
                        )}
                      </div>
                      <div className="form-group mt-4">
                        <Label className="form-label" htmlFor="country">
                          {t('common_phone_number')}
                        </Label>
                        <Input
                          name="mobile"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={String(validation.values.mobile) || ''}
                          invalid={!!(validation.touched.mobile && validation.errors.mobile)}
                        />
                        {validation.touched.mobile && validation.errors.mobile ? (
                          <FormFeedback type="invalid">{validation.errors.mobile}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="form-group mt-4 mb-5">
                        <Label className="form-label" htmlFor="country">
                          {t('user_profile_default_wallet_address')}
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
                      <h3 className="font-size-20">{t('user_profile_change_password')}</h3>
                      <div className="mt-5">
                        <Label className="form-label" htmlFor="oldPassword">
                          {t('user_profile_old_password')}
                        </Label>
                        <PasswordInput
                          name="oldPassword"
                          validation={validation}
                          placeholder={t('user_profile_old_password_placeholder')}
                          invalid={
                            !!(validation.touched.oldPassword && validation.errors.oldPassword)
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <Label className="form-label" htmlFor="password">
                          {t('user_profile_new_password')}
                        </Label>
                        <PasswordInput
                          name="password"
                          validation={validation}
                          placeholder={t('user_profile_new_password_placeholder')}
                          invalid={!!validation.errors.password}
                        />
                      </div>
                      <div className="mt-3">
                        <Label className="form-label" htmlFor="confirmPassword">
                          {t('user_profile_confirm_new_password')}
                        </Label>
                        <PasswordInput
                          name="confirmPassword"
                          validation={validation}
                          placeholder={t('user_profile_confirm_new_password')}
                          invalid={!!validation.errors.confirmPassword}
                        />
                      </div>
                      <div className="mt-3">
                        <Label className="form-label">
                          <Input
                            name="agreement"
                            type="checkbox"
                            checked={validation.values.checked}
                            onChange={validation.handleChange}
                          />{' '}
                          {t('user_profile_agree_checkbox_label')}
                        </Label>
                      </div>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Col xl={6} lg={10}>
                      {success ? (
                        <Alert color="success">{t('user_profile_successful_updated')}</Alert>
                      ) : null}

                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mt-5">
                        <Button style={{ width: '100%' }} type="submit" color="primary">
                          {t('common_save_changes')}
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
  );
};

export default withRouter(UserProfile);
