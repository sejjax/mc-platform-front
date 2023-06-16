import * as yup from "yup"

export const createNotificationSchema = yup.object().shape({
  notificationTitle: yup
    .string()
    .required("Необходимо заполнить название уведомления"),
  notificationMessage: yup
    .string()
    .required("Необходимо заполнить сообщение уведомления"),
  whomNotifySolo: yup
    .string()
    .matches(/^\d+$/, "Может содержать только одно число"),
  whomNotifyGroup: yup
    .string()
    .matches(
      /^[0-9,]+$/,
      "Может содержать только последовательность чисел через запятую."
    ),
})
