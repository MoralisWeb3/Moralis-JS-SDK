import Moralis from '@moralis/all';

export const EvmApi = () => {
  return (
    <div>
      <h2>EVM Api</h2>

      <button
        onClick={() => {
          Moralis.EvmApi.native
            .getBlock({
              block_number_or_hash: '1000000',
            })
            .then(console.log);
        }}
      >
        getBlock
      </button>

      <button
        onClick={() => {
          Moralis.EvmApi.token
            .getTokenMetadata({
              chain: 'rinkeby',
              addresses: ['0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5C5'],
            })
            .then(console.log);
        }}
      >
        getTokenMetadata
      </button>
    </div>
  );
};
