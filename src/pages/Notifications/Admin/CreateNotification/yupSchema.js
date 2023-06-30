import * as yup from 'yup';

import { t } from '../../../../i18n';

export const createNotificationSchema = yup.object().shape({
  notificationTitle: yup.string().required(t('notification_name_fill_hint')),
  notificationMessage: yup.string().required(t('notification_message_fill_hint')),
  whomNotifySolo: yup.string().matches(/^\d+$/, t('notification_only_one_number_hint')),
  whomNotifyGroup: yup.string().matches(/^[0-9,]+$/, t('notification_numbers_hint')),
});
