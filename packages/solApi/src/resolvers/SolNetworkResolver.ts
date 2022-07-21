import { MoralisCoreProvider, SolNetwork, SolNetworkish, SolNetworkName } from '@moralisweb3/core';
import { SolApiConfig } from '../config/SolApiConfig';

export class SolNetworkResolver {
  public static resolve(network: SolNetworkish | undefined): SolNetworkName {
    if (!network) {
      const core = MoralisCoreProvider.getDefault();
      network = core.config.get(SolApiConfig.defaultSolNetwork);
    }
    return SolNetwork.create(network).network;
  }
}
