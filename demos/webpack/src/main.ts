import { MoralisClient } from '@moralisweb3/client';
import { FrontEndOnlyBackendAdapter } from '@moralisweb3/client-backend-adapter-frontend-only';
import { EvmConnector } from '@moralisweb3/client-evm-auth';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { MagicLinkEvmConnector } from '@moralisweb3/client-connector-magic-link';
import { WalletConnectEvmConnector } from '@moralisweb3/client-connector-wallet-connect';

const MAGIC_CONNECT_PUBLISHABLE_API_KEY = 'pk_live_C5C14BF0761663FC';

async function reloadCurrentUser() {
  const userAddress = document.getElementById('userAddress') as HTMLElement;
  const userBalance = document.getElementById('userBalance') as HTMLElement;

  const users = await Promise.all([MoralisClient.EvmAuth.tryGetUser(), MoralisClient.SolAuth.tryGetUser()]);
  const user = users[0] || users[1];

  userAddress.innerText = user
    ? `address: ${user.address}, profileId: ${user.profileId || 'NOT_AUTHENTICATED'}`
    : `Unknown`;

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

async function authenticate(wallet: string) {
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
}

async function connect(action: string) {
  switch (action) {
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
}

async function logOut() {
  const evmUser = await MoralisClient.EvmAuth.tryGetUser();
  if (evmUser) {
    await MoralisClient.EvmAuth.logOut();
    return;
  }
  const solUser = await MoralisClient.SolAuth.tryGetUser();
  if (solUser) {
    await MoralisClient.SolAuth.logOut();
    return;
  }
  throw new Error('You are not logged in');
}

async function onButtonClicked(e: Event) {
  const action = (e.target as HTMLElement).getAttribute('data-action');
  const wallet = (e.target as HTMLElement).getAttribute('data-wallet');
  switch (action) {
    case 'authenticate':
      await authenticate(wallet as string);
      break;

    case 'connect':
      await connect(wallet as string);
      break;

    case 'logOut':
      await logOut();
      break;
  }
  await reloadCurrentUser();
}

async function init() {
  const connectors: EvmConnector[] = [
    WalletConnectEvmConnector.create({
      rpc: {
        1: 'https://replace_me/',
      },
    }),
  ];
  if (MAGIC_CONNECT_PUBLISHABLE_API_KEY) {
    // Add magic link auth button
    const authenticateButtonBar = document.getElementById('authenticate')!;
    const magicLinkAuthButton = document.createElement('button');
    magicLinkAuthButton.setAttribute('class', 'button');
    magicLinkAuthButton.setAttribute('data-action', 'authenticate');
    magicLinkAuthButton.setAttribute('data-wallet', 'magicLink');
    magicLinkAuthButton.innerText = 'Authenticate by MagicLink 🏐';
    authenticateButtonBar.innerHTML = authenticateButtonBar?.innerHTML + ' | ';
    authenticateButtonBar.appendChild(magicLinkAuthButton);

    // Add magic link connect button
    const connectButtonBar = document.getElementById('connect')!;
    const magicLinkConnectButton = document.createElement('button');
    magicLinkConnectButton.setAttribute('class', 'button');
    magicLinkConnectButton.setAttribute('data-action', 'connect');
    magicLinkConnectButton.setAttribute('data-wallet', 'magicLink');
    magicLinkConnectButton.innerText = 'Connect by MagicLink 🏐';
    connectButtonBar.innerHTML = connectButtonBar?.innerHTML + ' | ';
    connectButtonBar.appendChild(magicLinkConnectButton);

    // Add magic link connector
    connectors.push(MagicLinkEvmConnector.create(MAGIC_CONNECT_PUBLISHABLE_API_KEY));
  }

  MoralisClient.start({
    backendAdapter: FrontEndOnlyBackendAdapter.create({
      publicApiKey: 'TODO_TODO',
    }),
    evmAuth: {
      connectors,
    },
  });

  const buttons = document.getElementsByClassName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', onButtonClicked);
  }
  await reloadCurrentUser();
}

document.addEventListener('DOMContentLoaded', init);
