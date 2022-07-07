import Moralis from 'moralis';
import { Evm } from './Evm';
import { Server } from './Server';
import { EvmApi } from './EvmApi';
import { Core } from './Core';

// @ts-ignore
window.Moralis = Moralis;

Moralis.start({
  serverUrl: process.env.REACT_APP_SERVER_URL,
  appId: process.env.REACT_APP_APP_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  logLevel: 'verbose',
  defaultEvmApiChain: 'eth',
});

console.log('Moralis started', Moralis.Core.config.get('serverUrl'));

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
      <Core />
      <hr />
    </div>
  );
}

export default App;
