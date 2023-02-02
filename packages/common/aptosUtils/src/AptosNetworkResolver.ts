import Core from '@moralisweb3/common-core';
import { CommonAptosUtilsConfig } from './config/CommonAptosUtilsConfig';
import { AptosNetwork, AptosNetworkish, AptosNetworkName } from './dataTypes';

export class AptosNetworkResolver {
  public static resolve(network: AptosNetworkish | undefined, core: Core): AptosNetworkName {
    if (!network) {
      network = core.config.get(CommonAptosUtilsConfig.defaultAptosNetwork);
    }
    return AptosNetwork.create(network).network;
  }
}
