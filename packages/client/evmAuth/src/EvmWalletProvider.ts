import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export interface EvmWalletProvider {
  name: string;
  create(): Promise<JsonRpcProvider | Web3Provider> | JsonRpcProvider | Web3Provider;
}
