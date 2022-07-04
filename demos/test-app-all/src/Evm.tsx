import Moralis from 'moralis';
import { Erc20Value, EvmNative } from '@moralisweb3/core';
import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
import MetamaskConnector from '@moralisweb3/evm-metamask-connector';
import MagiclinkConnector from '@moralisweb3/evm-magic-link-connector';

// Register connector connect connector
Moralis.Evm.connectors.register(WalletConnectConnector);
Moralis.Evm.connectors.register(MagiclinkConnector);
// Moralis.Evm.connectors.remove('wallet-connect');

export const Evm = () => {
  return (
    <div>
      <h2>EVM</h2>
      <button onClick={() => Moralis.Evm.connect('metamask', { silent: false })}>Connect via metamask</button>
      <button onClick={() => Moralis.Evm.connect('magic-link', { email: 'example@email.com', apiKey: process.env.REACT_APP_MAGIC_LINK_KEY, chainId: 3, newSession: true })}>Connect via magiclink</button>
      <button onClick={() => Moralis.Evm.connect('wallet-connect', { newSession: true })}>
        Connect via walletconnect
      </button>
      <button onClick={() => Moralis.Evm.disconnect()}>Disconnect</button>
      <button onClick={() => console.log(Moralis.Evm.connector)}>get connector</button>
      <button onClick={() => console.log(Moralis.Evm.account)}>get account</button>
      <button onClick={() => console.log(Moralis.Evm.chain)}>get chainId</button>
      <button onClick={() => console.log(Moralis.Evm.provider)}>get provider</button>
      <button onClick={() => console.log(Moralis.Evm.provider?.getChainId().then((d) => console.log(d)))}>
        get provider chainId
      </button>
      <button
        onClick={async () => {
          console.log('Transfer native');
          const txResponse = await Moralis.Evm.transferNative({
            to: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
            value: EvmNative.create('0.0001'),
          });

          console.log('TX', txResponse);
          console.log('TX json', txResponse.toJSON());
          console.log('TX exporerUrl', txResponse.exporerUrl);

          const receipt = await txResponse.wait();
          console.log('RECEIPT', receipt);
          console.log('RECEIPT json', receipt.toJSON());
          console.log('RECEIPT totalGasCost', receipt.totalGasCost);
        }}
      >
        Transfer eth
      </button>
      <button
        onClick={async () => {
          console.log('Transfer native');

          const txResponse = await Moralis.Evm.transferErc20({
            // Unis token on ropsten
            contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
            to: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
            value: Erc20Value.create('0.01'),
          });

          console.log('TX', txResponse);
          console.log('TX json', txResponse.toJSON());
          console.log('TX exporerUrl', txResponse.exporerUrl);

          const receipt = await txResponse.wait();
          console.log('RECEIPT', receipt);
          console.log('RECEIPT json', receipt.toJSON());
          console.log('RECEIPT totalGasCost', receipt.totalGasCost);
        }}
      >
        Transfer UNI
      </button>
      <button
        onClick={async () => {
          console.log('Transfer nft');

          const txResponse = await Moralis.Evm.transferErc721({
            contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
            to: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
            tokenId: '1',
          });

          console.log('TX', txResponse);
          console.log('TX json', txResponse.toJSON());
          console.log('TX exporerUrl', txResponse.exporerUrl);

          const receipt = await txResponse.wait();
          console.log('RECEIPT', receipt);
          console.log('RECEIPT json', receipt.toJSON());
          console.log('RECEIPT totalGasCost', receipt.totalGasCost);
        }}
      >
        Transfer Erc721 NFT
      </button>
      <button
        onClick={async () => {
          console.log('Transfer nft');

          const txResponse = await Moralis.Evm.transferErc1155({
            contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
            to: '0x295522b61890c3672D12eFbFf4358a6411CE996F',
            tokenId: '1',
            value: 1,
          });

          console.log('TX', txResponse);
          console.log('TX json', txResponse.toJSON());
          console.log('TX exporerUrl', txResponse.exporerUrl);

          const receipt = await txResponse.wait();
          console.log('RECEIPT', receipt);
          console.log('RECEIPT json', receipt.toJSON());
          console.log('RECEIPT totalGasCost', receipt.totalGasCost);
        }}
      >
        Transfer Erc1155 NFT
      </button>
      <button
        onClick={() => {
          MetamaskConnector.addNetwork('kovan');
        }}
      >
        Add kovan network
      </button>
    </div>
  );
};
