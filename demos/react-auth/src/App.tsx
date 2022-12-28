import React, { useState, useEffect } from 'react';
import { MoralisClient } from '@moralisweb3/client';
import { User } from '@moralisweb3/client-auth-utils';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const getData = async () => {
    const [evmUser, solUser] = await Promise.all([
      MoralisClient.EvmAuth.tryGetUser(),
      MoralisClient.SolAuth.tryGetUser(),
    ]);
    const user = evmUser || solUser;

    if (user) {
      let balance: string | null = null;
      switch (user.networkType) {
        case 'evm':
          const evmProvider = await MoralisClient.EvmAuth.restoreProvider();
          balance = String(await evmProvider.getBalance(user.address));
          break;

        case 'solana':
          const solProvider = await MoralisClient.SolAuth.restoreProvider();
          const publicKey = new PublicKey(solProvider.publicKey);

          const connection = new Connection(clusterApiUrl('devnet')); // Here we use devnet, but this code is only for example purposes.
          balance = String(await connection.getBalance(publicKey));
          break;

        default:
          throw new Error('Unsupported network type');
      }

      setAuthenticated(true);
      setUser(user);
      setBalance(balance);
    }
  };
  useEffect(() => {
    getData().catch((e) => {
      console.error(e);
      setBalance('error');
    });
  }, []);

  const connect = async (wallet: string) => {
    switch (wallet) {
      case 'metaMask':
        await MoralisClient.EvmAuth.connect();
        break;

      case 'walletConnect':
        await MoralisClient.EvmAuth.connect('walletConnect');
        break;

      case 'magicLink':
        await MoralisClient.EvmAuth.connect('magicLink');
        break;

      case 'phantom':
        await MoralisClient.SolAuth.connect();
        break;
    }
    await getData();
  };

  const authenticate = async (wallet: string) => {
    switch (wallet) {
      case 'metaMask':
        await MoralisClient.EvmAuth.authenticate();
        break;

      case 'walletConnect':
        await MoralisClient.EvmAuth.authenticate('walletConnect');
        break;

      case 'magicLink':
        await MoralisClient.EvmAuth.authenticate('magicLink');
        break;

      case 'phantom':
        await MoralisClient.SolAuth.authenticate();
        break;
    }
    await getData();
  };

  const logout = async () => {
    const [evmUser, solUser] = await Promise.all([
      MoralisClient.EvmAuth.tryGetUser(),
      MoralisClient.SolAuth.tryGetUser(),
    ]);
    if (!evmUser && !solUser) {
      throw new Error('You are not logged in');
    }

    if (evmUser) {
      await MoralisClient.EvmAuth.logOut();
    }
    if (solUser) {
      await MoralisClient.SolAuth.logOut();
    }
    setAuthenticated(false);
    setUser(null);
    setBalance(null);
  };

  return (
    <div className="App">
      <h1>🔒 Simple React Page with Auth</h1>

      <p>
        👨‍🦱 Current user:
        <strong id="userAddress">
          {authenticated && user
            ? `address: ${user.address}, profileId: ${user.profileId || 'NOT_AUTHENTICATED'}`
            : 'Not logged in'}
        </strong>
      </p>

      <p>
        🏦 Balance:
        <strong id="userBalance">{balance}</strong>
      </p>

      <h4>Authenticate</h4>

      <div id="authenticate">
        <button className="button" onClick={() => authenticate('metaMask')}>
          Authenticate by MetaMask ⚽
        </button>
        |
        <button className="button" onClick={() => authenticate('walletConnect')}>
          Authenticate by WalletConnect ⚾
        </button>
        |
        <button className="button" onClick={() => authenticate('magicLink')}>
          Authenticate by MagicLink 🏐
        </button>
        |
        <button className="button" onClick={() => authenticate('phantom')}>
          Authenticate by Phantom 🥎
        </button>
      </div>

      <h4>Connect</h4>

      <div id="connect">
        <button className="button" onClick={() => connect('metaMask')}>
          Connect by MetaMask ⚽
        </button>
        |
        <button className="button" onClick={() => connect('walletConnect')}>
          Connect by WalletConnect ⚾
        </button>
        |
        <button className="button" onClick={() => connect('magicLink')}>
          Connect by MagicLink 🏐
        </button>
        |
        <button className="button" onClick={() => connect('phantom')}>
          Connect by Phantom 🥎
        </button>
      </div>

      <div>
        <button className="button" onClick={() => logout()}>
          Log Out ⛔
        </button>
      </div>
    </div>
  );
}

export default App;
