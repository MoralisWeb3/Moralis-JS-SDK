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
              transaction_hash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5',
            })
            .then(console.log);
        }}
      >
        getTransaction
      </button>

      <button
        onClick={() => {
          Moralis.EvmApi.account
            .getNativeBalance({
              address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
            })
            .then(console.log);
        }}
      >
        getNativeBalance
      </button>

      <button
        onClick={() => {
          Moralis.EvmApi.token
            .getNFTMetadata({
              address: '0x7dE3085b3190B3a787822Ee16F23be010f5F8686',
            })
            .then(console.log);
        }}
      >
        getNFTMetadata
      </button>

      <button
        onClick={() => {
          Moralis.EvmApi.token
            .getTokenPrice({
              address: ''
            })
            .then(console.log);
        }}
      >
        getTokenAllowance
      </button>
    </div>
  );
};
