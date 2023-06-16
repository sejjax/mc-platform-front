import * as Yup from "yup"

const editProfileSchema = Yup.object({
  fullName: Yup.string().required("Пожалуйста введите имя"),
  country: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .required("Пожалуйста выберите страну"),
  mobile: Yup.string().required("Пожалуйста заполните телефон"),
  photo: Yup.object()
    .shape({
      id: Yup.string(),
      path: Yup.string(),
    })
    .notRequired(),
  oldPassword: Yup.string()
    .notRequired()
    .min(8, "Пароль слишком короткий — минимум 8 символов.")
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      "Пароль должен  содержать 8 символов, один в верхнем регистре, один в нижнем регистре, одну цифру и один символ специального регистра"
    ),
  password: Yup.string()
    .notRequired()
    .min(8, "Пароль слишком короткий — минимум 8 символов.")
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      "Пароль должен  содержать 8 символов, один в верхнем регистре, один в нижнем регистре, одну цифру и один символ специального регистра"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .when("password", {
      is: password => password !== undefined,
      then: Yup.string().required("Пожалуйста повторите пароль"),
      otherwise: Yup.string().notRequired(),
    }),
})

export default editProfileSchema
