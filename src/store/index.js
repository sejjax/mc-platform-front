import {
  loadStoreFromLocalStorage,
  saveStoreToLocalStorage,
} from "helpers/saveStore"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"

import rootReducer from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  loadStoreFromLocalStorage(),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

store.subscribe(() => {
  const { Profile } = store.getState()
  saveStoreToLocalStorage({
    Profile: {
      user: Profile.user,
      isAuth: Profile.isAuth,
      error: null,
      success: null,
    },
  })
})

export default store
