import { CoreErrorCode, CoreError } from './Error';
import { Core } from './Core';

export class CoreProvider {
  private static core?: Core;

  public static getDefault(): Core {
    if (!this.core) {
      throw new CoreError({
        code: CoreErrorCode.NOT_INITIALIZED,
        message: 'Default instance of Core is not set',
      });
    }
    return this.core;
  }

  public static setDefault(core: Core) {
    if (this.core) {
      throw new CoreError({
        code: CoreErrorCode.ALREADY_INITIALIZED,
        message: 'Default instance of Core is already set',
      });
    }
    this.core = core;
  }
}
