import { CoreModuleType } from './CoreModuleType';
import { EvmChain, EvmAddress } from '../dataTypes';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { BaseModule, BaseModuleConfig } from './BaseModule';

/**
 * Configuration for the creation of any Moralis Api module
 */
export interface NetworkModuleConfig extends BaseModuleConfig {}

// TODO: make more generic and fix unknown types, as it it is EVM-specific right now
interface ConnectResponse {
  chain: EvmChain | null;
  account: EvmAddress | null;
  provider: unknown;
  connector: unknown;
}

/**
 * The base class of every Moralis Network class that gets registered as a module via MoralisModules
 * It should always be created with a config object that provides the
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 */
export abstract class NetworkModule extends BaseModule {
  type: CoreModuleType.NETWORK;

  constructor({ name, core }: NetworkModuleConfig) {
    super({ name, type: CoreModuleType.NETWORK, core });
    this.type = CoreModuleType.NETWORK;
  }

  /**
   * connect function, that allows any Moralis module to connect to the network.
   * This function returns a ConnectResponse object
   */
  async connect(options?: Record<string, unknown>): Promise<ConnectResponse> {
    throw new MoralisCoreError({
      code: CoreErrorCode.NOT_IMPLEMENTED,
      message: `'connect()' is not implemented for module "${this.name}"`,
    });
  }

  /**
   * signMessage function, that allows any Moralis module to connect to sign a message to the network.
   * This function returns a signed message
   */
  async signMessage(message: string): Promise<string> {
    throw new MoralisCoreError({
      code: CoreErrorCode.NOT_IMPLEMENTED,
      message: `'signMessage()' is not implemented for module "${this.name}"`,
    });
  }
}
