import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisClient } from '@moralisweb3/client';
import { FrontEndOnlyBackendAdapter } from '@moralisweb3/client-backend-adapter-frontend-only';
import { MagicLinkEvmConnector } from '@moralisweb3/client-connector-magic-link';
import { EvmConnector } from '@moralisweb3/client-evm-auth';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const connectors: EvmConnector[] = [
  MagicLinkEvmConnector.create(process.env.REACT_APP_MAGIC_CONNECT_PUBLISHABLE_API_KEY!),
];
MoralisClient.start({
  backendAdapter: FrontEndOnlyBackendAdapter.create({
    publicApiKey: 'TODO_TODO',
  }),
  evmAuth: {
    connectors,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
