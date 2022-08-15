const EVM_PROXY_URL = 'http://localhost:4000/api/evm-api-proxy';
const SOLANA_PROXY_URL = 'http://localhost:4000/api/solana-api-proxy';

const elError = document.getElementById('error');
const elResult = document.getElementById('result');
const elBtnEvmWeights = document.getElementById('evm-endpoint-weights');
const elBtnEvmVersion = document.getElementById('evm-version');
const elBtnEvmNativeBalance = document.getElementById('evm-native-balance');
const elBtnSolanaNativeBalance = document.getElementById('solana-native-balance');

const handleEvmProxyCall = async (endpoint, params) => {
  const result = await axios.get(`${EVM_PROXY_URL}/${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });

  renderResult(result.data);
};

const handleSolanaProxyCall = async (endpoint, params) => {
  const result = await axios.get(`${SOLANA_PROXY_URL}/${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });

  renderResult(result.data);
};

// evm api proxy calls
const web3apiVersion = () => {
  handleEvmProxyCall('web3/version');
};

const endpointWeights = () => {
  handleEvmProxyCall('info/endpointWeights');
};

const getEvmNativeBalance = () => {
  handleEvmProxyCall('0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7/balance?chain=0x4');
};

// solana api proxy calls
const getSolanaNativeBalance = () => {
  handleSolanaProxyCall('account/mainnet/A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU/balance');
};

const renderResult = (result) => {
  elResult.innerHTML = result ? JSON.stringify(result, null, 2) : '';
};

const renderError = (error) => {
  elError.innerHTML = error ? JSON.stringify(error.message, null, 2) : '';
};

function init() {
  elBtnEvmWeights.addEventListener('click', async () => {
    endpointWeights().catch((error) => renderError(error));
  });

  elBtnEvmVersion.addEventListener('click', async () => {
    web3apiVersion().catch((error) => renderError(error));
  });

  elBtnEvmNativeBalance.addEventListener('click', async () => {
    getEvmNativeBalance().catch((error) => renderError(error));
  });

  elBtnSolanaNativeBalance.addEventListener('click', async () => {
    getSolanaNativeBalance().catch((error) => renderError(error));
  });
}

window.addEventListener('load', () => {
  init();
});
