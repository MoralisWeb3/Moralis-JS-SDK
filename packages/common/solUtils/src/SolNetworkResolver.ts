import MoralisCore from '@moralisweb3/core';
import { SolUtilsConfig } from './config/SolUtilsConfig';
import { SolNetwork, SolNetworkish, SolNetworkName } from './dataTypes';

export class SolNetworkResolver {
  public static resolve(network: SolNetworkish | undefined, core: MoralisCore): SolNetworkName {
    if (!network) {
      network = core.config.get(SolUtilsConfig.defaultSolNetwork);
    }
    return SolNetwork.create(network).network;
  }
}
