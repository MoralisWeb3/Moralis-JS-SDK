import { MoralisCore } from './MoralisCore';

export class MoralisCoreProvider {
  private static core?: MoralisCore;

  public static getDefault(): MoralisCore {
    if (!this.core) {
      throw new Error('The default MoralisCore instance is not set');
    }
    return this.core;
  }

  public static setDefault(core: MoralisCore) {
    if (this.core) {
      throw new Error('The default MoralisCore instance is already exist');
    }
    this.core = core;
  }
}
