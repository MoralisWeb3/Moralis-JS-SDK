import { CoreErrorCode, MoralisCoreError } from './Error';
import { MoralisCore } from './MoralisCore';

export class MoralisCoreProvider {
  private static core?: MoralisCore;

  public static getDefault(): MoralisCore {
    if (!this.core) {
      throw new MoralisCoreError({
        code: CoreErrorCode.GENERIC_CORE_ERROR,
        message: 'Default instance of MoralisCore is not set',
      });
    }
    return this.core;
  }

  public static setDefault(core: MoralisCore) {
    if (this.core) {
      throw new MoralisCoreError({
        code: CoreErrorCode.GENERIC_CORE_ERROR,
        message: 'Default instance of MoralisCore is already set',
      });
    }
    this.core = core;
  }
}
