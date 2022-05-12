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
          Moralis.EvmApi.native
            .getTransaction({
              transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5',
            })
            .then(console.log);
        }}
      >
        getTransaction
      </button>
    </div>
  );
};
