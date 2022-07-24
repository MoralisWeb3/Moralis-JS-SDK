import { MoralisCoreProvider } from '@moralisweb3/core';
import { SolNetwork, SolNetworkish, SolNetworkName } from '@moralisweb3/sol-utils';
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
