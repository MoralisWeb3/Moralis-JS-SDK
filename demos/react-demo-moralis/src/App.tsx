import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEvmWalletTokenBalances } from '@moralisweb3/react';

function App() {
  const { data, error } = useEvmWalletTokenBalances({ address: '0x34030D7E833631cDe61f8bC4f6785D00a3999161' });
  console.log('data: ', data);
  console.log('error: ', error);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
