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
          Moralis.EvmApi.resolve
            .resolveDomain({
              domain: 'brad.crypto',
            })
            .then(console.log);
        }}
      >
        resolveDomain
      </button>
    </div>
  );
};
