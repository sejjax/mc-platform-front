import * as Yup from 'yup';

import { t } from '../i18n';

const editProfileSchema = Yup.object({
  fullName: Yup.string().required(t('auth_register_full_name_hint_required')),
  country: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .required(t('auth_register_choose_country_hint')),
  mobile: Yup.string().required(t('common_phone_number_validation_hint')),
  photo: Yup.object()
    .shape({
      id: Yup.string(),
      path: Yup.string(),
    })
    .notRequired(),
  oldPassword: Yup.string()
    .notRequired()
    .min(8, t('common_password_hint_small'))
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      t('common_password_hint_validation'),
    ),
  password: Yup.string()
    .notRequired()
    .min(8, t('common_password_hint_small'))
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      t('common_password_hint_validation'),
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('common_password_hint_not_match'))
    .when('password', {
      is: (password) => password !== undefined,
      then: Yup.string().required(t('common_password_hint_repeat')),
      otherwise: Yup.string().notRequired(),
    }),
});

export default editProfileSchema;
