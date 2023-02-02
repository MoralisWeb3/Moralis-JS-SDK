import { AptosStreamNetwork, EvmStreamNetwork } from '../utils/StreamNetwork';

export interface AptosStreamNetworkOptions {
  networkType: AptosStreamNetwork;
}

export interface EvmStreamNetworkOptions {
  networkType?: EvmStreamNetwork;
}
