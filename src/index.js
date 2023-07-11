import React from 'react';

import LanguageProvider from 'helpers/localization/languageProvider';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import WalletConnectWrapper from 'components/WalletConnectWrapper/WalletConnectWrapper';

import App from './App';
import './i18n';
import * as serviceWorker from './serviceWorker';
import store from './store';

const app = (
  <LanguageProvider>
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
  </LanguageProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
