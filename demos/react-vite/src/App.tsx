import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useEvmWalletTokenBalances, useSolPortfolio } from '@moralisweb3/react';

function App() {
  const [evmAddress, setEvmAddress] = useState('0x75e3e9c92162e62000425c98769965a76c2e387a');
  const [solAddress, setSolAddress] = useState('BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen');
  const {
    data: evmBalance,
    fetch: fetchErc20,
    error: errorErc20,
  } = useEvmWalletTokenBalances({ address: evmAddress }, { revalidateOnMount: false });
  const { data: solPortfolio, fetch: fetchSol, error: errorSol } = useSolPortfolio();

  return (
    <div className="App">
      <div className="header">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://moralis.io" target="_blank">
          <img src="/moralis.svg" className="logo moralis" alt="Moralis logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Vite React Moralis Demo</h1>
      </div>

      <div>
        <h4>Get Ethereum Token Balance</h4>
        <div className="form-input">
          <input name="address" value={evmAddress} onChange={(e) => setEvmAddress(e.target.value)} />
          <button className="search_btn" onClick={() => fetchErc20()}>
            🔎
          </button>
        </div>
        <h4>Result:</h4>
        {errorErc20 ? (
          <pre data-out>{JSON.stringify(errorErc20)}</pre>
        ) : (
          <pre data-out>{evmBalance ? JSON.stringify(evmBalance, null, 2) : 'Click the "🔎" button to fetch data'}</pre>
        )}
      </div>

      <div>
        <h4>Get Solana Portfolio</h4>
        <div className="form-input">
          <input name="address" value={solAddress} onChange={(e) => setSolAddress(e.target.value)} />
          <button className="search_btn" onClick={() => fetchSol({ address: solAddress })}>
            🔎
          </button>
        </div>
        <h4>Result:</h4>
        {errorSol ? (
          <pre data-out>{JSON.stringify(errorSol)}</pre>
        ) : (
          <pre data-out>
            {solPortfolio ? JSON.stringify(solPortfolio, null, 2) : 'Click the "🔎" button to fetch data'}
          </pre>
        )}
      </div>

      <footer>
        <p>
          🙋 You have questions? Ask them on the <a href="https://forum.moralis.io/">Moralis forum</a>
        </p>
        <p>
          📖 Read more about{' '}
          <a href="https://moralis.io/?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate">
            Moralis
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
