import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MoralisConfig, MoralisProvider } from '@moralisweb3/react';

const moralisConfig: MoralisConfig = {
  apiKey: import.meta.env.VITE_APP_MORALIS_API,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MoralisProvider config={moralisConfig}>
    <App />
  </MoralisProvider>,
);
