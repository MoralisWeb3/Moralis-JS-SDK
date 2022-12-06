import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export type EvmProviderName = 'default' | string;

export type EvmProviderFactory = (
  providerName: EvmProviderName,
) => Promise<JsonRpcProvider | Web3Provider> | JsonRpcProvider | Web3Provider;

export interface EvmAuthClientOptions {
  /**
   * @description Factory of custom Ethereum provider.
   */
  providerFactory?: EvmProviderFactory;
}
