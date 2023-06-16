import {
  GET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  EDIT_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "./actionTypes"
import { API_SUCCESS, API_FAIL } from "../common/actionTypes"

const INIT_STATE = {
  notifications: [
    {
      id: "",
      notification_date: "",
      notification_type: "",
      notification_title: "Loading Notifications ...",
      notification_text: "",
    },
  ],
  currentItemId: null,
}

const Notifications = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_NOTIFICATIONS:
          return {
            ...state,
            notifications: action.payload.data,
          }
        case ADD_NOTIFICATION:
          return {
            ...state,
            notifications: [...state.notifications, action.payload.data],
          }
        case EDIT_NOTIFICATION:
          console.log("action.payload :>> ", action.payload)
          return {
            ...state,
            notifications: state.notifications.map(item => {
              if (item.id === action.payload.data.id) {
                return action.payload.data
              }
              return item
            }),
          }

        case DELETE_NOTIFICATION:
          console.log("action.payload reducer", action.payload)
          return {
            ...state,
            notifications: state.notifications.filter(
              item => item.id !== action.payload.data
            ),
          }
        default:
          return state
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_NOTIFICATIONS:
          return {
            ...state,
            notificationsError: action.payload.error,
          }
        default:
          return state
      }
    default:
      return state
  }
}

export default Notifications
