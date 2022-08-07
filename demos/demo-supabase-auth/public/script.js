const AUTH_API_URL = 'http://localhost:3000/api/auth';

const elError = document.getElementById('error');
const elUser = document.getElementById('user');
const elBtnMetamask = document.getElementById('auth-metamask');
const elBtnGetUser = document.getElementById('getUser');
const _supabase = supabase.createClient(
  'https://hiwyamcfnlxxabcdjeqc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpd3lhbWNmbmx4eGFiY2RqZXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkzMzI5NzIsImV4cCI6MTk3NDkwODk3Mn0.WuQuAFeg_KStVv89iw6Oeb2rTivSbCqfAtw9PSdPFRo',
);

const handleApiPost = async (endpoint, params) => {
  const result = await axios.post(`${AUTH_API_URL}/${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });

  return result.data;
};

let token;

const requestMessage = (account, chain) =>
  handleApiPost('request-message', {
    address: account,
    chain: chain,
    network: 'evm',
  });

const verifyMessage = (message, signature) =>
  handleApiPost('sign-message', {
    message,
    signature,
    network: 'evm',
  });

const getUser = async (token) => {
  _supabase.auth.setAuth(token);
  const { data } = await _supabase.from('users').select('*');
  renderUser(data);
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

  token = user.token;

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
  elBtnGetUser.addEventListener('click', async () => {
    getUser(token).catch((error) => renderError(error));
  });
}

window.addEventListener('load', () => {
  init();
});
