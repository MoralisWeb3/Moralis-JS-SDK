/* global document, window, axios, supabase, ethers */
const AUTH_API_URL = 'http://localhost:3000/api/auth';
const SUPABASE_URL = 'replace_me';
const SUPABASE_PUBLIC_ANON_KEY = 'replace_me';

const elError = document.getElementById('error');
const elUser = document.getElementById('user');
const elBtnMetamask = document.getElementById('auth-metamask');
const elBtnGetUser = document.getElementById('getUser');
const elBtnGetUserAnon = document.getElementById('getUserAnon');
const _supabaseAnon = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);
let _supabaseAuthenticated;

const handleApiPost = async (endpoint, params) => {
  const result = await axios.post(`${AUTH_API_URL}/${endpoint}`, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return result.data;
};

const requestMessage = (account, chain) =>
  handleApiPost('request-message', {
    address: account,
    chain,
    networkType: 'evm',
  });

const verifyMessage = (message, signature) =>
  handleApiPost('sign-message', {
    message,
    signature,
    networkType: 'evm',
  });

const getUser = async () => {
  if (!_supabaseAuthenticated) {
    // eslint-disable-next-line no-alert
    window.alert('You need to authenticate with Metamask first.');
    return;
  }
  const { data } = await _supabaseAuthenticated.from('users').select('*');
  renderUser(data);
  renderError();
};

const getUserAnon = async () => {
  const { data } = await _supabaseAnon.from('users').select('*');
  renderUser(data);
  renderError();
};

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

  const { message } = await requestMessage(account, chain);

  const signature = await signer.signMessage(message);

  const { user } = await verifyMessage(message, signature);

  _supabaseAuthenticated = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  renderUser(user);
  renderError();
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
  elBtnGetUser.addEventListener('click', async () => {
    getUser().catch((error) => renderError(error));
  });
  elBtnGetUserAnon.addEventListener('click', async () => {
    getUserAnon().catch((error) => renderError(error));
  });
}

window.addEventListener('load', () => {
  init();
});
