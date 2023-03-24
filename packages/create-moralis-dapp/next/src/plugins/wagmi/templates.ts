export const imports = `
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
{{#unless hasRainbowkit}}import { InjectedConnector } from 'wagmi/connectors/injected'{{/unless}}
`;

export const config = `
{{#unless hasRainbowkit}}
const connectors = [new InjectedConnector()];
const { provider } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});
{{/unless}}
`;

export const example = `
import { useEvmWalletTokenBalances } from '@moralisweb3/react';
import React from 'react';
import { Default } from '../layouts';
import styles from './Home.module.css';
import { useAccount } from 'wagmi';


export default function Home() {
  const [evmAddress, setEvmAddress] = React.useState('0x75e3e9c92162e62000425c98769965a76c2e387a');
  const {
    data: evmBalance,
    refetch: fetchErc20,
    error: errorErc20,
  } = useEvmWalletTokenBalances({ address: evmAddress }, { enabled: false });
    const { address } = useAccount();

  React.useEffect(() => {
    if (!address) {
      return;
    }
    setEvmAddress(address);
  }, [address]);

  return (
    <Default>
      <div className={styles.content}>
        <h4>Get Ethereum Token Balance</h4>
        <div className={styles.address_input}>
          <input name="evmAddress" value={evmAddress} onChange={(e) => setEvmAddress(e.target.value)} />
          <button className={styles.search_btn} onClick={() => fetchErc20()}>
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
    </Default>
  );
}
`;
