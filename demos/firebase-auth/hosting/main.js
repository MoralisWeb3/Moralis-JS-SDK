/* eslint-disable no-console */

async function connectToMetamask() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

  const [accounts, chainId] = await Promise.all([
    provider.send('eth_requestAccounts', []),
    provider.send('eth_chainId', []),
  ]);

  const signer = provider.getSigner();
  return { signer, chain: chainId, address: accounts[0] };
}

async function authenticate() {
  const { signer, chain, address } = await connectToMetamask();

  const messageResponse = await functions.httpsCallable('requestMessage')({
    address,
    chain,
  });
  const message = messageResponse.data.message;
  const uid = messageResponse.data.profileId;

  const signature = await signer.signMessage(message);

  const tokenResponse = await functions.httpsCallable('issueToken')({
    message,
    signature,
  });
  const token = tokenResponse.data.token;

  await firebase.auth().signInWithCustomToken(token);

  document.getElementById('currentUser').innerText = `${address} (uid: ${uid})`;
}

async function getSecretData() {
  const response = await functions.httpsCallable('getSecretData')({});
  alert(JSON.stringify(response.data));
}

async function getTime() {
  const response = await functions.httpsCallable('getTime')({});
  alert(JSON.stringify(response.data));
}

function bindButton(id, handler) {
  document.getElementById(id).addEventListener('click', async () => {
    try {
      await handler();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  });
}

function pageLoaded() {
  functions = firebase.functions();
  if (location.hostname === 'localhost') {
    functions.useFunctionsEmulator('http://localhost:5001');
  }

  bindButton('authenticateButton', authenticate);
  bindButton('getSecretDataButton', getSecretData);
  bindButton('getTimeButton', getTime);
}

window.addEventListener('load', pageLoaded);
