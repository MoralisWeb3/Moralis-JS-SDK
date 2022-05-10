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
            .resolveAddress({
              address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            })
            .then(console.log);
        }}
      >
        resolveAddress
      </button>
    </div>
  );
};
