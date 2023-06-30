import { API_FAIL, API_SUCCESS } from '../common/actionTypes';
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION,
  GET_NOTIFICATIONS,
} from './actionTypes';

const INIT_STATE = {
  notifications: [
    {
      id: '',
      notification_date: '',
      notification_type: '',
      notification_title: 'Loading Notifications ...',
      notification_text: '',
    },
  ],
  currentItemId: null,
};

const Notifications = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_NOTIFICATIONS:
          return {
            ...state,
            notifications: action.payload.data,
          };
        case ADD_NOTIFICATION:
          return {
            ...state,
            notifications: [...state.notifications, action.payload.data],
          };
        case EDIT_NOTIFICATION:
          return {
            ...state,
            notifications: state.notifications.map((item) => {
              if (item.id === action.payload.data.id) {
                return action.payload.data;
              }
              return item;
            }),
          };

        case DELETE_NOTIFICATION:
          return {
            ...state,
            notifications: state.notifications.filter((item) => item.id !== action.payload.data),
          };
        default:
          return state;
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_NOTIFICATIONS:
          return {
            ...state,
            notificationsError: action.payload.error,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default Notifications;
