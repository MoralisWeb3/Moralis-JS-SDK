import { EvmChain, EvmAddress } from '../dataTypes';
import { MoralisCore } from '../MoralisCore';
import { EvmConnection } from '../sharedTypes';
import { NetworkModule } from './NetworkModule';

class TestNetworkModule extends NetworkModule {
  public connect(): Promise<EvmConnection> {
    throw new Error('Method not implemented.');
  }
  public signMessage(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  private _supportedConnectors?: string[];
  public get supportedConnectors(): string[] {
    return this._supportedConnectors || [];
  }
  public setSupportedConnectors(c: string[]) {
    this._supportedConnectors = c;
  }
  public get isConnected(): boolean {
    throw new Error('Method not implemented.');
  }
  public get chain(): EvmChain | null {
    throw new Error('Method not implemented.');
  }
  public get account(): EvmAddress | null {
    throw new Error('Method not implemented.');
  }
  public setup() {
    // Nothing
  }
  public start() {
    // Nothing
  }
}

describe('NetworkModule', () => {
  let networkModule: TestNetworkModule;

  beforeEach(() => {
    const core = MoralisCore.create();
    networkModule = new TestNetworkModule('network', core);
  });

  it('hasConnector() returns proper value', () => {
    networkModule.setSupportedConnectors(['alfa', 'beta']);

    expect(networkModule.hasConnector('alfa')).toBe(true);
    expect(networkModule.hasConnector('beta')).toBe(true);
    expect(networkModule.hasConnector('gamma')).toBe(false);
  });
});
