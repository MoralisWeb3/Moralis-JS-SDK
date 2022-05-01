import { Moralis } from '@moralis/all';
import { Erc20Value, EvmNative } from '@moralis/core';
// import { sushimakerAbi } from './sushimakerAbi';

// const sushimakerAddresses = {
//   eth: '0x5ad6211cd3fde39a9cecb5df6f380b8263d1e277',
//   polygon: '0xf1c9881be22ebf108b8927c4d197d126346b5036',
// };
// const Sushimaker = new Contract(sushimakerAddresses.eth, 'eth', sushimakerAbi);
// Sushimaker.setAddress(sushimakerAddresses.polygon, 'polygon');

export const Evm = () => {
  return (
    <div>
      <h2>EVM</h2>
      <button onClick={() => Moralis.Evm.connect('metamask', { silent: false })}>Connect via metamask</button>
      <button onClick={() => Moralis.Evm.connect('walletconnect', { newSession: true })}>
        Connect via walletconnect
      </button>
      <button onClick={() => Moralis.Evm.disconnect()}>Disconnect</button>
      <button onClick={() => console.log(Moralis.Evm.wallet)}>get wallet</button>
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
            contract: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
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
    </div>
  );
};
