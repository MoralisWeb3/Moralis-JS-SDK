import { MoralisClient } from '@moralisweb3/client';
import { FrontEndOnlyBackendAdapter } from '@moralisweb3/client-backend-adapter-frontend-only';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { WalletConnectEvmWalletProvider } from './WalletConnectEvmWalletProvider';

async function reloadCurrentUser() {
  const userAddress = document.getElementById('userAddress') as HTMLElement;
  const userBalance = document.getElementById('userBalance') as HTMLElement;

  const users = await Promise.all([MoralisClient.EvmAuth.tryGetUser(), MoralisClient.SolAuth.tryGetUser()]);
  const user = users[0] || users[1];

  userAddress.innerText = user ? `${user.address}` : `Unknown`;

  let balance: string | null = null;
  if (user) {
    try {
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
      }
    } catch (e) {
      console.error(e);
      balance = 'error';
    }
  }

  userBalance.innerText = balance ? balance : 'Unknown';
}

async function signIn(action: string) {
  switch (action) {
    case 'signInByMetaMask':
      await MoralisClient.EvmAuth.authenticate();
      break;

    case 'signInByWalletConnect':
      localStorage.removeItem('walletconnect');
      await MoralisClient.EvmAuth.authenticate('walletconnect');
      break;

    case 'signInByPhantom':
      await MoralisClient.SolAuth.authenticate();
      break;
  }
  await reloadCurrentUser();
}

async function signOut() {
  const evmUser = await MoralisClient.EvmAuth.tryGetUser();
  if (evmUser) {
    await MoralisClient.EvmAuth.logOut();
  }
  const solUser = await MoralisClient.SolAuth.tryGetUser();
  if (solUser) {
    await MoralisClient.SolAuth.logOut();
  }
  await reloadCurrentUser();
}

function onButtonClicked(e: Event) {
  const action = (e.target as HTMLElement).getAttribute('data-action');
  switch (action) {
    case 'signInByMetaMask':
    case 'signInByWalletConnect':
    case 'signInByPhantom':
      signIn(action);
      break;

    case 'signOut':
      signOut();
      break;
  }
}

async function init() {
  MoralisClient.start({
    backendAdapter: FrontEndOnlyBackendAdapter.create({
      publicApiKey: 'TODO_TODO',
    }),
    evmAuth: {
      walletProviders: [WalletConnectEvmWalletProvider.create()],
    },
  });

  const buttons = document.getElementsByClassName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', onButtonClicked);
  }
  await reloadCurrentUser();
}

document.addEventListener('DOMContentLoaded', init);
