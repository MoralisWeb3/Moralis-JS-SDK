import { MoralisCore } from './MoralisCore';

export class MoralisCoreProvider {
  private static core?: MoralisCore;

  public static getDefault(): MoralisCore {
    if (!this.core) {
      this.core = MoralisCore.create();
    }
    return this.core;
  }

  public static hasDefault(): boolean {
    return !!this.core;
  }
}
