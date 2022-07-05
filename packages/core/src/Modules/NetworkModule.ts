import { EvmAddress, EvmChain } from './../dataTypes';
import { EventMap } from 'typed-emitter';
import { CoreModuleType } from './CoreModuleType';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { BaseModule, BaseModuleConfig } from './BaseModule';
import { EvmConnection } from '../sharedTypes';

/**
 * Configuration for the creation of any Moralis Api module
 */
export interface NetworkModuleConfig extends BaseModuleConfig {}

/**
 * The base class of every Moralis Network class that gets registered as a module via MoralisModules
 * It should always be created with a config object that provides the
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class NetworkModule<Events extends EventMap = any> extends BaseModule<Events> {
  type: CoreModuleType.NETWORK;

  constructor({ name, core }: NetworkModuleConfig) {
    super({ name, type: CoreModuleType.NETWORK, core });
    this.type = CoreModuleType.NETWORK;
  }

  /**
   * connect function, that allows any Moralis module to connect to the network.
   * This function returns a ConnectResponse object
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async connect(connector: string, options?: unknown): Promise<EvmConnection> {
    throw new MoralisCoreError({
      code: CoreErrorCode.NOT_IMPLEMENTED,
      message: `'connect()' is not implemented for module "${this.name}"`,
    });
  }

  /**
   * signMessage function, that allows any Moralis module to connect to sign a message to the network.
   * This function returns a signed message
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signMessage(message: string): Promise<string> {
    throw new MoralisCoreError({
      code: CoreErrorCode.NOT_IMPLEMENTED,
      message: `'signMessage()' is not implemented for module "${this.name}"`,
    });
  }

  abstract get supportedConnectors(): string[];

  abstract get isConnected(): boolean;

  abstract get chain(): EvmChain | null;

  abstract get account(): EvmAddress | null;
}
