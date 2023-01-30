import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider, createMoralisConfig } from '@moralisweb3/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const moralisConfig = createMoralisConfig({ apiKey: process.env.REACT_APP_MORALIS_KEY || '' });

root.render(
  <BrowserRouter>
    <ChakraProvider resetCSS>
      <MoralisProvider config={moralisConfig}>
        <App />
      </MoralisProvider>
    </ChakraProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
