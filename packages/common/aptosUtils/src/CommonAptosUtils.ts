import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonAptosUtilsConfigSetup } from './config';
import * as dataTypes from './dataTypes';

export class CommonAptosUtils extends Module {
  public static readonly moduleName = 'aptosUtils';

  public static create(core?: Core): CommonAptosUtils {
    return new CommonAptosUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(CommonAptosUtils.moduleName, core);
  }

  public setup() {
    CommonAptosUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  get AptosAddress() {
    return dataTypes.AptosAddress
  }

  get AptosNative() {
    return dataTypes.AptosNative
  }

  get AptosNetwork() {
    return dataTypes.AptosNetwork
  }
}
