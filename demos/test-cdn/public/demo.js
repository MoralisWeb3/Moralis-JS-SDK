/* eslint-disable no-console */

function initMoralis() {
  Moralis.Evm.connectors.register(WalletConnectConnector);

  Moralis.start({
    serverUrl: MORALIS_SERVER_URL,
    appId: MORALIS_APP_ID
  });
}

function appendButton(label, handler) {
  const demo = document.getElementById('demo');
  const button = document.createElement('button');
  button.innerText = label;
  button.addEventListener('click', async () => {
    try {
      const result = await handler();
      console.log('result', result ?? 'undefined');
    } catch (e) {
      console.error('error', e);
    }
  });
  demo.appendChild(button);
}

function initDemo() {
  appendButton('Connect Metamask', () => {
    return Moralis.Evm.connect('metamask', {});
  });

  appendButton('Connect WalletConnect', () => {
    return Moralis.Evm.connect('wallet-connect', {});
  });

  appendButton('Transfer Native', () => {
    return Moralis.Evm.transferNative({
      to: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
      value: '0.001',
    });
  });

  appendButton('Fetch Api Version', () => {
    return Moralis.EvmApi.info.web3ApiVersion();
  });
}

window.addEventListener('load', () => {
  initMoralis();
  initDemo();
});
