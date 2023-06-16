import {
  SET_DEPOSIT_LOADING,
  SET_DEPOSIT_SUCCESS,
  SET_WALLET_VALUES,
} from "./actionTypes"

const initState = {
  walletNumber: null,
  loading: false,
  depositSuccess: null,
}

const Wallet = (state = initState, action) => {
  switch (action.type) {
    case SET_WALLET_VALUES:
      return { ...state, ...action.payload }

    case SET_DEPOSIT_LOADING:
      return { ...state, loading: action.payload }

    case SET_DEPOSIT_SUCCESS:
      return { ...state, depositSuccess: action.payload }

    default:
      return state
  }
}

export default Wallet
