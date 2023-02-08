import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MoralisProvider } from '@moralisweb3/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MoralisProvider config={{ apiKey: import.meta.env.VITE_APP_MORALIS_API }}>
    <App />
  </MoralisProvider>,
);
