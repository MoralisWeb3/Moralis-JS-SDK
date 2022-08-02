import { CoreErrorCode, MoralisCoreError } from './Error';
import { MoralisCore } from './MoralisCore';

export class MoralisCoreProvider {
  private static core?: MoralisCore;

  public static getDefault(): MoralisCore {
    if (!this.core) {
      throw new MoralisCoreError({
        code: CoreErrorCode.NOT_INITIALIZED,
        message: 'Default instance of MoralisCore is not set',
      });
    }
    return this.core;
  }

  public static setDefault(core: MoralisCore) {
    if (this.core) {
      throw new MoralisCoreError({
        code: CoreErrorCode.ALREADY_INITIALIZED,
        message: 'Default instance of MoralisCore is already set',
      });
    }
    this.core = core;
  }
}
