import { Erc20Transfer } from '@moralisweb3/common-evm-utils';
import { useEffect, useState } from 'react';
import { useMoralis } from './components/Moralis';

export function App() {
  const moralis = useMoralis();
  const [solBalance, setSolBalance] = useState<string | null>(() => null);
  const [tokenTransfers, setTokenTransfers] = useState<string[] | null>(() => null);

  useEffect(() => {
    async function load() {
      const getBalanceResponse = await moralis.solApi.account.getBalance({
        address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
      });
      setSolBalance(getBalanceResponse.raw.lamports);

      let getWTTResponse = await moralis.evmApi.token.getWalletTokenTransfers({
        address: '0x72fdd62fbfa2faa9a8677c58d9992068772e0f7f',
        chain: '0x1',
        limit: 50,
      });

      let transfers = convertTransfers(getWTTResponse.result);
      setTokenTransfers(transfers);

      let limit = 5;
      while (getWTTResponse.hasNext() && --limit) {
        // eslint-disable-next-line no-await-in-loop
        getWTTResponse = await getWTTResponse.next();

        transfers = [...transfers, ...convertTransfers(getWTTResponse.result)];
        setTokenTransfers(transfers);
      }
    }

    load();
  }, []);

  return (
    <div className="App">
      <h1>🛰 Use Moralis API from Firebase Client Demo</h1>

      <h4>💰 Solana Balance</h4>

      <p>{solBalance ?? 'Loading...'}</p>

      <h4>💵 Evm Wallet Token Transfers</h4>

      {!tokenTransfers ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {tokenTransfers.map((transfer) => (
              <li>{transfer}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function convertTransfers(transfers: Erc20Transfer[]): string[] {
  return transfers.map((transfer) => transfer.address.checksum);
}
