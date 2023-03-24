export const imports = `
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
`;

export const config = `
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
`;

export const connectWallet = `
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import React from 'react';

export default function ConnectWallet() {
  const { chainId, account, activate, active, library } = useWeb3React();
  
  const onClick = () => {
    activate(new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] }));
  };

  return (
    <>
      {account ? (
        <div>{account}</div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect Wallet
        </button>
      )}
    </>
  );
}
`;
