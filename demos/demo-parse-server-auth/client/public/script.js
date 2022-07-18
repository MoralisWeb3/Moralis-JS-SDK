const AUTH_API_URL = 'http://localhost:1337/api/auth';

const handleApiPost = async (endpoint, params) => {
  const result = await axios.post(`${AUTH_API_URL}/${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });

  return result.data;
};

const requestMessage = (account, chain) =>
  handleApiPost('request-message', {
    address: account.checksum,
    chain: chain.hex,
    network: 'evm',
  });

const verifyMessage = (message, signature) =>
  handleApiPost('sign-message', {
    message,
    signature,
    network: 'evm',
  });

const handleAuth = async () => {
  const { account, chain } = await Moralis.Evm.connect('metamask');

  if (!account) {
    throw new Error('No account found');
  }
  if (!chain) {
    throw new Error('No chain found');
  }

  const { message } = await requestMessage(account, chain);
  const signature = await Moralis.Evm.signMessage(message);
  const { user } = await verifyMessage(message, signature);

  renderUser(user);
};

const renderUser = (user) => {
  document.getElementById('user').innerHTML = user ? JSON.stringify(user, null, 2) : '';
};

function init() {
  Moralis.start({
    // TODO: remove required configs from Moralis
    serverUrl: 'serverUrl',
    appId: 'appId',
    apiKey: 'apiKey',
  });

  document.getElementById('auth-metamask').addEventListener('click', async () => {
    handleAuth();
  });
}

window.addEventListener('load', () => {
  init();
});
