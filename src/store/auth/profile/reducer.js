import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
  SET_PROFILE_DATA,
  RESET_PROFILE_DATA,
  SET_AGREEMENT,
} from "./actionTypes"

const initialState = {
  error: null,
  success: null,
  isAuth: false,
  user: {
    country: null,
    default_wallet_address: null,
    needToFirstStructure: { percent: 0, value: 0 },
    needToAllStructure: { percent: 0, value: 0 },
    createdAt: null,
    deposit: null,
    email: null,
    fullName: null,
    level: 0,
    investorLevel: null,
    baseDepositLevel: 0,
    mobile: null,
    partnerId: null,
    photo: null,
    role: { access: [] },
    username: null,
    agreement: null,
  },
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
      }

    case SET_AGREEMENT:
      return { ...state, user: { ...state.user, agreement: action.payload } }

    case SET_PROFILE_DATA:
      return {
        ...state,
        isAuth: true,
        user: { ...state.user, ...action.payload },
      }

    case RESET_PROFILE_DATA:
      return {
        ...state,
        isAuth: false,
        user: { ...initialState.user },
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      }

    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case RESET_PROFILE_FLAG:
      return {
        ...state,
        success: null,
      }

    default:
      return {
        ...state,
      }
  }
}

export default profile
// {
//     country: null,

//     createdAt: null,
//     deposit: null,
//     email: null,
//     fullName: null,
//     level: null,
//     mobile: null,
//     partnerId: null,
//     photo: null,
//     username: null,
//   }
