import { fetchReferralName } from "services/authService"
import * as Yup from "yup"

const registerSchema = Yup.object({
  referrerId: Yup.string().test(
    "checkCorrect",
    "Пригласитель не найден",
    async value => {
      const data = await fetchReferralName(value)
      return !!data.name
    }
  ),
  email: Yup.string().email().required("Пожалуйста введите ваш Email"),
  fullName: Yup.string().required("Пожалуйста введите имя"),
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
  country: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .required("Пожалуйста выберите страну"),
  mobile: Yup.string(),
  recaptcha: Yup.string().required().nullable(),
})
// .matches(mobileValidation, 'Must be valid number format').required("Please Enter Your Phone Number")
export default registerSchema
