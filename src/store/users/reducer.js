import { SET_STATUS_MESSAGE, SET_USERS } from './actionTypes';

const INIT_STATE = {
  statusMessage: null,
  users: [
    { id: 1, username: 'stan', email: '123@mail.ru', permissions: ['3'] },
    { id: 2, username: 'smith', emial: '31@mial.ru', permissions: ['1', '2'] },
  ],
};

const Users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_STATUS_MESSAGE:
      return { ...state, statusMessage: action.payload };
    case SET_USERS:
      return { ...state, users: action.paylaod };
    default:
      return state;
  }
};

export default Users;
