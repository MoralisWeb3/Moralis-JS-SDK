import Moralis from '@moralis/all';
import { Evm } from './Evm';
import { Server } from './Server';
import { EvmApi } from './EvmApi';
import { LogLevel } from '@moralis/core';

// @ts-ignore
window.Moralis = Moralis;
Moralis.start({
  serverUrl: process.env.SERVER_URL,
  appId: process.env.APP_ID,
  apiKey: process.env.API_KEY,
  logLevel: LogLevel.VERBOSE,
});

function App() {
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
