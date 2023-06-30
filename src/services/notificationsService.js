import { del, get, post, put } from 'helpers/api_helper';

const notificationPath = '/notifications';

export const getNotificationsTypeRequest = async () => {
  return await get(`${notificationPath}/types`);
};

export const getAllNotificationsRequest = async () => {
  return await get(`${notificationPath}/all`);
};

export const addNotificationRequest = async (data) => {
  return await post(`${notificationPath}`, data);
};

export const editNotificationRequest = async (data) => {
  return await put(`${notificationPath}`, data);
};

export const deleteNotificationRequest = async (data) => {
  return await del(`${notificationPath}`, {
    data,
  });
};

export const getOneNotificationRequest = async (notificationId) => {
  return await get(`${notificationPath}/${notificationId}`);
};
