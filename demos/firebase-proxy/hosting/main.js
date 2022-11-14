/* eslint-disable no-console */

const ERC721_MINI_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

let functions;

function testGetTime() {
  return functions.httpsCallable('getTime')();
}

function testGetBlock() {
  return functions.httpsCallable('getBlock')({
    chain: '0x1',
    blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
  });
}

function testRunContractFunction() {
  return functions.httpsCallable('runContractFunction')({
    chain: '0x1',
    functionName: 'balanceOf',
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    abi: ERC721_MINI_ABI,
    params: {
      owner: '0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24',
    },
  });
}

function testGetNFTContractMetadata() {
  return functions.httpsCallable('getNFTContractMetadata')({
    address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
  });
}

function testVersion() {
  return functions.httpsCallable('getWeb3ApiVersion')({});
}

function testGetPortfolio() {
  return functions.httpsCallable('getPortfolio')({
    network: 'mainnet',
    address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
  });
}

function bindButton(id, handler) {
  document.getElementById(id).addEventListener('click', async () => {
    try {
      const result = await handler();
      alert(JSON.stringify(result));
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

  bindButton('getTimeButton', testGetTime);
  bindButton('getBlockButton', testGetBlock);
  bindButton('runContractFunctionButton', testRunContractFunction);
  bindButton('getNFTContractMetadataButton', testGetNFTContractMetadata);
  bindButton('web3ApiVersionButton', testVersion);
  bindButton('getPortfolioButton', testGetPortfolio);
}

window.addEventListener('load', pageLoaded);
