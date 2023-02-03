import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonSolUtilsConfigSetup } from './config';
import * as dataTypes from './dataTypes';

export class CommonSolUtils extends Module {
  public static readonly moduleName = 'solUtils';

  public static create(core?: Core): CommonSolUtils {
    return new CommonSolUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(CommonSolUtils.moduleName, core);
  }

  public setup() {
    CommonSolUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  public get SolAddress() {
    return dataTypes.SolAddress;
  }

  public get SolNative() {
    return dataTypes.SolNative;
  }

  public get SolNetwork() {
    return dataTypes.SolNetwork;
  }
}
