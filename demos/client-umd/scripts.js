// Replace with yout Moralis API key (make sure to set up the roles correctly, as it is accessible from the client)
const MORALIS_API_KEY = '';

// References to the HTML elements that we need (make sure the script is executed after the DOM elements are loaded)
const elements = {
  wrapperEvmToken: document.querySelector('[data-request=evm-token]'),
  wrapperSolanaToken: document.querySelector('[data-request=solana-token]'),
};

// Initialise moralis and all eventListeners
function initialise() {
  Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  elements.wrapperEvmToken.getElementsByTagName('form')[0].addEventListener('submit', handleEvmTokenForm);
  elements.wrapperSolanaToken.getElementsByTagName('form')[0].addEventListener('submit', handleSolanaTokenForm);
}

// Fetch the token balances for the given address and update the UI
async function handleEvmTokenForm(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const address = data.get('address');

  const elOut = elements.wrapperEvmToken.querySelector('[data-out]');

  try {
    elOut.innerHTML = 'Fetching...';
    const { result } = await Moralis.EvmApi.token.getWalletTokenBalances({ address });
    elOut.innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    elOut.innerHTML = JSON.stringify({ error: error.message }, null, 2);
  }
}

// Fetch the token balances for the given address and update the UI
async function handleSolanaTokenForm(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const address = data.get('address');

  const elOut = elements.wrapperSolanaToken.querySelector('[data-out]');

  try {
    elOut.innerHTML = 'Fetching...';
    const { result } = await Moralis.SolApi.account.getSPL({ address });
    elOut.innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    elOut.innerHTML = JSON.stringify({ error: error.message }, null, 2);
  }
}

// Initialise the app when the script is loaded
initialise();
