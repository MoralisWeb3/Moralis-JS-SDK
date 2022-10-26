import Core from '@moralisweb3/common-core';
import { CommonSolUtilsConfig } from './config/CommonSolUtilsConfig';
import { SolNetwork, SolNetworkish, SolNetworkName } from './dataTypes';

export class SolNetworkResolver {
  public static resolve(network: SolNetworkish | undefined, core: Core): SolNetworkName {
    if (!network) {
      network = core.config.get(CommonSolUtilsConfig.defaultSolNetwork);
    }
    return SolNetwork.create(network).network;
  }
}
