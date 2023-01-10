import { MoralisClient } from '@moralisweb3/client';
import { FrontEndOnlyBackendAdapter } from '@moralisweb3/client-backend-adapter-frontend-only';
import { EvmConnector } from '@moralisweb3/client-evm-auth';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { MagicLinkEvmConnector } from '@moralisweb3/client-connector-magic-link';
import { WalletConnectEvmConnector } from '@moralisweb3/client-connector-wallet-connect';
import { WalletConnect2EvmConnector } from '@moralisweb3/client-connector-wallet-connect-2';

const WALLET_CONNECT_ETHEREUM_MAINNET_RPC = process.env.WALLET_CONNECT_ETHEREUM_MAINNET_RPC;
const WALLET_CONNECT_2_PROJECT_ID = process.env.WALLET_CONNECT_2_PROJECT_ID;
const MAGIC_CONNECT_PUBLISHABLE_API_KEY = process.env.MAGIC_CONNECT_PUBLISHABLE_API_KEY;

function validateWalletConnectV1() {
  return !!WALLET_CONNECT_ETHEREUM_MAINNET_RPC;
}

function validateWalletConnectV2() {
  return WALLET_CONNECT_ETHEREUM_MAINNET_RPC && WALLET_CONNECT_2_PROJECT_ID;
}

function validateMagicLinkApiKey() {
  return !!MAGIC_CONNECT_PUBLISHABLE_API_KEY;
}

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

async function onEvmWalletDisconnected() {
  await MoralisClient.EvmAuth.logOut(); // Clear session on this side
  await reloadCurrentUser(); // Update UI
}

async function onSolWalletDisconnected() {
  await MoralisClient.SolAuth.logOut(); // Clear session on this side
  await reloadCurrentUser(); // Update UI
}

async function authenticate(wallet: string) {
  switch (wallet) {
    case 'metaMask':
      await MoralisClient.EvmAuth.authenticate();
      MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      break;

    case 'walletConnect':
      if (validateWalletConnectV1()) {
        await MoralisClient.EvmAuth.authenticate('walletConnect');
        MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      } else {
        alert('Please set Wallet Connect V1 config in .env file to authenticate using it');
      }
      break;

    case 'walletConnect2':
      if (validateWalletConnectV2()) {
        await MoralisClient.EvmAuth.authenticate('walletConnect2');
        MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      } else {
        alert('Please set Wallet Connect V2 config in .env file to authenticate using it');
      }
      break;

    case 'magicLink':
      if (validateMagicLinkApiKey()) {
        await MoralisClient.EvmAuth.authenticate('magicLink');
        MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      } else {
        alert('Please set MagicLink config in .env file to authenticate using it');
      }
      break;

    case 'phantom':
      await MoralisClient.SolAuth.authenticate();
      MoralisClient.SolAuth.onClientDisconnect(onSolWalletDisconnected);
      break;
  }
}

async function connect(action: string) {
  switch (action) {
    case 'metaMask':
      await MoralisClient.EvmAuth.connect();
      MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      break;

    case 'walletConnect':
      if (validateWalletConnectV1()) {
        await MoralisClient.EvmAuth.connect('walletConnect');
        MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      } else {
        alert('Please set Wallet Connect V1 config in .env file to connect using it');
      }
      break;

    case 'walletConnect2':
      if (validateWalletConnectV2()) {
        await MoralisClient.EvmAuth.connect('walletConnect2');
        MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      } else {
        alert('Please set Wallet Connect V2 config in .env file to connect using it');
      }
      break;

    case 'magicLink':
      if (validateMagicLinkApiKey()) {
        await MoralisClient.EvmAuth.connect('magicLink');
        MoralisClient.EvmAuth.onClientDisconnect(onEvmWalletDisconnected);
      } else {
        alert('Please set MagicLink config in .env file to connect using it');
      }
      break;

    case 'phantom':
      await MoralisClient.SolAuth.connect();
      MoralisClient.SolAuth.onClientDisconnect(onSolWalletDisconnected);
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
  alert('You are not logged in');
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
  const connectors: EvmConnector[] = [];
  if (validateWalletConnectV1()) {
    // Add WalletConnect v1 connector
    connectors.push(
      WalletConnectEvmConnector.create({
        rpc: {
          1: WALLET_CONNECT_ETHEREUM_MAINNET_RPC!,
        },
      }),
    );
  }
  if (validateWalletConnectV2()) {
    // Add WalletConnect v2 connector
    connectors.push(
      WalletConnect2EvmConnector.create({
        appMetadata: {
          name: 'Moralis Webpack App',
          description: 'Moralis App with WalletConnect V2 Auth',
          url: 'https://moralis.io/',
          icons: [],
        },
        ethereumRpc: WALLET_CONNECT_ETHEREUM_MAINNET_RPC!,
        projectId: WALLET_CONNECT_2_PROJECT_ID!,
      }),
    );
  }
  if (validateMagicLinkApiKey()) {
    // Add MagicLink connector
    connectors.push(MagicLinkEvmConnector.create(MAGIC_CONNECT_PUBLISHABLE_API_KEY!));
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
