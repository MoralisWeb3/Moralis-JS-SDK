import { MoralisProvider } from '@moralisweb3/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.addEventListener(
  'error',
  function (event) {
    const { error } = event;
    // Skip the first error, it is always irrelevant in the DEV mode.
    if (error.stack?.indexOf('invokeGuardedCallbackDev') >= 0 && !error.alreadySeen) {
      error.alreadySeen = true;
      event.preventDefault();
      return;
    }
    // Normal error handling.
  },
  { capture: true },
);

const container = document.getElementById('root');
const root = createRoot(container!); // eslint-disable-line
root.render(
  <MoralisProvider serverUrl={process.env.REACT_APP_SERVER_URL} appId={process.env.REACT_APP_APP_ID}>
    <App />
  </MoralisProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
