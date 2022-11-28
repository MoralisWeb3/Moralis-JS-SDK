import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonSolUtilsConfigSetup } from './config';

export class CommonSolUtils implements Module {
  public readonly name = 'solUtils';

  public static create(core?: Core): CommonSolUtils {
    return new CommonSolUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(protected readonly core: Core) {}

  public setup() {
    CommonSolUtilsConfigSetup.register(this.core.config);
  }
}
