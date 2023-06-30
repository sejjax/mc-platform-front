import * as Yup from 'yup';

import { fetchReferralName } from 'services/authService';

import { t } from '../i18n';

const registerSchema = Yup.object({
  referrerId: Yup.string().test(
    'checkCorrect',
    t('auth_register_simple_inviter_error'),
    async (value) => {
      const data = await fetchReferralName(value);
      return !!data.name;
    },
  ),
  email: Yup.string().email().required(t('common_email_hint_required')),
  fullName: Yup.string().required(t('auth_register_full_name_hint_required')),
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
  country: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .required(t('auth_register_choose_country_hint')),
  mobile: Yup.string(),
  recaptcha: Yup.string().required().nullable(),
});
// .matches(mobileValidation, 'Must be valid number format').required("Please Enter Your Phone Number")
export default registerSchema;
