import { EvmAddress, EvmChain } from './../dataTypes';
import { EventMap } from 'typed-emitter';
import { CoreModuleType } from './CoreModuleType';
import { BaseModule } from './BaseModule';
import { EvmConnection } from '../sharedTypes';
import { MoralisCore } from '../MoralisCore';

/**
 * The base class of every Moralis Network class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 */
export abstract class NetworkModule<Events extends EventMap = any> extends BaseModule<Events> {
  public readonly type: CoreModuleType.NETWORK = CoreModuleType.NETWORK;

  constructor(name: string, core: MoralisCore) {
    super(name, core, CoreModuleType.NETWORK);
  }

  /**
   * connect function, that allows any Moralis module to connect to the network.
   * This function returns a ConnectResponse object
   */
  public abstract connect(connector: string, options?: unknown): Promise<EvmConnection>;

  /**
   * signMessage function, that allows any Moralis module to connect to sign a message to the network.
   * This function returns a signed message
   */
  public abstract signMessage(message: string): Promise<string>;

  public hasConnector(name: string): boolean {
    return this.supportedConnectors.includes(name);
  }

  abstract get supportedConnectors(): string[];

  abstract get isConnected(): boolean;

  abstract get chain(): EvmChain | null;

  abstract get account(): EvmAddress | null;
}
