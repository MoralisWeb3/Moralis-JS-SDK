import Moralis from 'moralis';

// References to the HTML elements that we need (make sure the script is executed after the DOM elements are loaded)
const elements = {
  wrapperEvmToken: document.querySelector('[data-request=evm-token]') as HTMLElement,
  wrapperSolanaToken: document.querySelector('[data-request=solana-token]') as HTMLElement,
};

// Initialise moralis and all eventListeners
function initialise() {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  elements.wrapperEvmToken.getElementsByTagName('form')[0].addEventListener('submit', handleEvmTokenForm);
  elements.wrapperSolanaToken.getElementsByTagName('form')[0].addEventListener('submit', handleSolanaTokenForm);
}

// Fetch the token balances for the given address and update the UI
async function handleEvmTokenForm(event: SubmitEvent) {
  event.preventDefault();

  if (!event.target) {
    return;
  }

  const data = new FormData(event.target as HTMLFormElement);
  const address = data.get('address') as string;

  const elOut = elements.wrapperEvmToken.querySelector('[data-out]') as HTMLElement;

  try {
    elOut.innerHTML = 'Fetching...';
    const { result } = await Moralis.EvmApi.token.getWalletTokenBalances({ address });
    elOut.innerHTML = JSON.stringify(result, null, 2);
  } catch (error: any) {
    elOut.innerHTML = JSON.stringify({ error: error.message }, null, 2);
  }
}

// Fetch the token balances for the given address and update the UI
async function handleSolanaTokenForm(event: SubmitEvent) {
  event.preventDefault();

  const data = new FormData(event.target as HTMLFormElement);
  const address = data.get('address') as string;

  const elOut = elements.wrapperSolanaToken.querySelector('[data-out]') as HTMLElement;

  try {
    elOut.innerHTML = 'Fetching...';
    const { result } = await Moralis.SolApi.account.getSPL({ address });
    elOut.innerHTML = JSON.stringify(result, null, 2);
  } catch (error: any) {
    elOut.innerHTML = JSON.stringify({ error: error.message }, null, 2);
  }
}

// Initialise the app when the script is loaded
initialise();
