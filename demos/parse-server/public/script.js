/* global axios ethers */

const AUTH_API_URL = 'http://localhost:1337/api/auth';

const elError = document.getElementById('error');
const elUser = document.getElementById('user');
const elBtnMetamask = document.getElementById('auth-metamask');
const elBtnPhantom = document.getElementById('auth-phantom');

const handleApiPost = async (endpoint, params) => {
  const result = await axios.post(`${AUTH_API_URL}/${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });

  return result.data;
};

const requestMessage = (account, networkType, chain) =>
  handleApiPost('request-message', {
    address: account,
    chain,
    networkType,
  });

const verifyMessage = (message, signature, networkType) =>
  handleApiPost('sign-message', {
    message,
    signature,
    networkType,
  });

const connectToMetamask = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

  const [accounts, chainId] = await Promise.all([
    provider.send('eth_requestAccounts', []),
    provider.send('eth_chainId', []),
  ]);

  const signer = provider.getSigner();
  return { signer, chain: chainId, account: accounts[0] };
};

const handleAuth = async () => {
  // Connect to Metamask
  const { signer, chain, account } = await connectToMetamask();

  if (!account) {
    throw new Error('No account found');
  }
  if (!chain) {
    throw new Error('No chain found');
  }

  const { message } = await requestMessage(account, 'evm', chain);

  const signature = await signer.signMessage(message);

  const { user } = await verifyMessage(message, signature, 'evm');

  renderUser(user);
};

const connectToPhantom = async () => {
  const provider = window.solana;
  if (provider.isPhantom) {
    await provider.connect();
    const solAddress = provider.publicKey.toBase58();
    return { signer: provider, account: solAddress };
  }
  throw new Error('Not connected to Phantom');
};

const handleAuthSol = async () => {
  // Connect to Phantom
  const { signer, account } = await connectToPhantom();

  if (!account) {
    throw new Error('No account found');
  }

  const { message } = await requestMessage(account, 'solana');

  const encodedMessage = new TextEncoder().encode(message);

  const signedMessage = await signer.signMessage(encodedMessage);

  // eslint-disable-next-line no-undef
  const signature = Base58.encode(signedMessage.signature);

  const { user } = await verifyMessage(message, signature, 'solana');

  renderUser(user);
};

const renderUser = (user) => {
  elUser.innerHTML = user ? JSON.stringify(user, null, 2) : '';
};

const renderError = (error) => {
  elError.innerHTML = error ? JSON.stringify(error.message, null, 2) : '';
};

function init() {
  elBtnMetamask.addEventListener('click', async () => {
    handleAuth().catch((error) => renderError(error));
  });

  elBtnPhantom.addEventListener('click', async () => {
    handleAuthSol().catch((error) => renderError(error));
  });
}

window.addEventListener('load', () => {
  init();
});
