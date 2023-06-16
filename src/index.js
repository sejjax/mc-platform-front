import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"

import store from "./store"
import { ToastProvider } from "react-toast-notifications"
import WalletConnectWrapper from "components/WalletConnectWrapper/WalletConnectWrapper"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider>
        {/* <WalletProvider> */}
        <WalletConnectWrapper>
          <App />
        </WalletConnectWrapper>
        {/* </WalletProvider> */}
      </ToastProvider>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
