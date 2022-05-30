import { EvmChain, EvmChainish, MoralisNetworkConnectorError, NetworkConnectorErrorCode } from '@moralisweb3/core';

/**
 * Get all MoralisRpcs, based on the provided speedyNodeKey
 */
export const getMoralisRpcs = (speedyNodeKey: string) => ({
  1: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/mainnet`,
  3: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/ropsten`,
  4: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/rinkeby`,
  5: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/goerli`,
  42: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/kovan`,
  137: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/polygon/mainnet`,
  80001: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/polygon/mumbai`,
  56: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/bsc/mainnet`,
  97: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/bsc/testnet`,
  43114: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/avalanche/mainnet`,
  43113: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/avalanche/testnet`,
  250: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/fantom/mainnet`,
});

export const getMoralisRpc = (speedyNodeKey: string, chain: EvmChainish) => {
  const rpcs = getMoralisRpcs(speedyNodeKey);

  const numberChainId = EvmChain.create(chain).decimal;
  const validChainIds = Object.keys(rpcs).map((id) => +id);

  if (!validChainIds.includes(numberChainId)) {
    throw new MoralisNetworkConnectorError({
      code: NetworkConnectorErrorCode.INVALID_ARGUMENT,
      message: `Invalid chainId. Supported chains: ${validChainIds.join(', ')}`,
    });
  }
};
