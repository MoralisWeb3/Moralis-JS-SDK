import { MoralisClient } from '@moralisweb3/client';
import { FrontEndOnlyAuthAdapter } from '@moralisweb3/client-adapter-frontend-only';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { web3providerFactory } from './Web3ProviderFactory';

async function reloadCurrentUser() {
  const userAddress = document.getElementById('userAddress') as HTMLElement;
  const userBalance = document.getElementById('userBalance') as HTMLElement;

  const users = await Promise.all([MoralisClient.evmAuth.tryGetUser(), MoralisClient.solAuth.tryGetUser()]);
  const user = users[0] || users[1];

  userAddress.innerText = user ? `${user.address}` : `Unknown`;

  let balance: string | null = null;
  if (user) {
    try {
      switch (user.networkType) {
        case 'evm':
          const evmProvider = await MoralisClient.evmAuth.restoreProvider();
          balance = String(await evmProvider.getBalance(user.address));
          break;

        case 'solana':
          const solProvider = await MoralisClient.solAuth.restoreProvider();
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
      await MoralisClient.evmAuth.authenticate();
      break;

    case 'signInByWalletConnect':
      localStorage.removeItem('walletconnect');
      await MoralisClient.evmAuth.authenticate('walletconnect');
      break;

    case 'signInByPhantom':
      await MoralisClient.solAuth.authenticate();
      break;
  }
  await reloadCurrentUser();
}

async function signOut() {
  const evmUser = await MoralisClient.evmAuth.tryGetUser();
  if (evmUser) {
    await MoralisClient.evmAuth.logOut();
  }
  const solUser = await MoralisClient.solAuth.tryGetUser();
  if (solUser) {
    await MoralisClient.solAuth.logOut();
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
    authAdapter: FrontEndOnlyAuthAdapter.create({
      publicApiKey: '0x12345678910',
    }),
    evmAuthOptions: {
      providerFactory: web3providerFactory,
    },
  });

  const buttons = document.getElementsByClassName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', onButtonClicked);
  }
  await reloadCurrentUser();
}

document.addEventListener('DOMContentLoaded', init);
