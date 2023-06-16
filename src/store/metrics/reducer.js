import { SET_METRICS } from "./actionTypes"

const INIT_STATE = {
  metrics: [],
}

const Metrics = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_METRICS:
      return { ...state, metrics: action.payload }
    default:
      return state
  }
}

export default Metrics
