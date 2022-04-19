import Moralis from '@moralis/all';
import React, { useEffect } from 'react';
import { Evm } from './Evm';
import { Server } from './Server';
import { EvmApi } from './EvmApi';
import { LogLevel } from '@moralis/core';

// @ts-ignore
window.Moralis = Moralis;

function App() {
  useEffect(() => {
    Moralis.start({
      serverUrl: 'https://q3slxxmqigzl.usemoralis.com:2053/server',
      appId: 'SAXOUWvburVcDCu9w47jIuZfiac5531wleepNRoa',
      apiKey: '',
      logLevel: LogLevel.VERBOSE,
    });
  });
  return (
    <div>
      <h1>Test app</h1>
      <Evm />
      <hr />
      <Server />
      <hr />
      <EvmApi />
      <hr />
    </div>
  );
}

export default App;
