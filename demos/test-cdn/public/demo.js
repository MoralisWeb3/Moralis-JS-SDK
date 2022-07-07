/* eslint-disable no-console */

function initMoralis() {
  Moralis.Evm.connectors.register(WalletConnectConnector);
  Moralis.Evm.connectors.register(Web3AuthConnector);

  Moralis.start({
    serverUrl: 'https://ebjeii2azqho.usemoralis.com:2053/server',
    appId: 'xNakeM5DuGxNzLWH2igeFQBa8xrHtoeLhFa2kt6C',
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
  appendButton('Evm.connect / metamask', () => {
    return Moralis.Evm.connect('metamask', {});
  });

  appendButton('Evm.connect / walletConnect', () => {
    return Moralis.Evm.connect('wallet-connect', {});
  });

  appendButton('Evm.connect / web3auth', () => {
    return Moralis.Evm.connect('web3auth', { clientId: WEB3AUTH_CLIENTID, newSession: true });
  });

  appendButton('Evm.transferNative', () => {
    return Moralis.Evm.transferNative({
      to: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
      value: '0.001',
    });
  });

  appendButton('EvmApi.info.web3ApiVersion', () => {
    return Moralis.EvmApi.info.web3ApiVersion();
  });

  appendButton('EvmApi.native.getBlock', () => {
    return Moralis.EvmApi.native.getBlock({
      blockNumberOrHash: '1000000',
    });
  });

  appendButton('Server.authenticate', () => {
    return Moralis.Server.authenticate('evm', { connector: 'metamask', silent: false });
  });

  appendButton('Server.fetchIPFS', () => {
    return Moralis.Server.fetchIPFS('QmUfpsyqc4hwozotRo4woyi5fJqvfcej5GcFvKiWoY6xr6');
  });
}

window.addEventListener('load', () => {
  initMoralis();
  initDemo();
});
