import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MoralisConfig, MoralisProvider } from '@moralisweb3/react';

const moralisConfig: MoralisConfig = {
  apiKey: process.env.REACT_APP_MORALIS_KEY || '',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MoralisProvider config={moralisConfig}>
    <App />
  </MoralisProvider>,
);
