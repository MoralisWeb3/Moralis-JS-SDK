import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MoralisInitializer } from './components/Moralis';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MoralisInitializer initializing={<AppLoading />} initialized={<AppLoaded />} />
  </React.StrictMode>,
);

function AppLoading() {
  return <div>Loading...</div>;
}

function AppLoaded() {
  return <App />;
}
