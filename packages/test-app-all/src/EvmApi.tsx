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
          Moralis.EvmApi.resolve.resolveDomain({
            domain: 'brad.crypto',
          });
        }}
      >
        resolveDomain
      </button>

      <button
        onClick={() => {
          Moralis.EvmApi.defi
            .getPairReserves({
              pair_address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
            })
            .then(console.log);
        }}
      >
        getPairReserves
      </button>

      <button
        onClick={() => {
          Moralis.EvmApi.token
            .getTokenAllowance({
              address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
              ownerAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
              spenderAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
            })
            .then(console.log);
        }}
      >
        getTokenAllowance
      </button>
    </div>
  );
};
