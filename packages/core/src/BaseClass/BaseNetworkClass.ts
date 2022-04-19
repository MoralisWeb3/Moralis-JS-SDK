import { EvmChain, EvmAddress } from '../dataTypes';
import { CoreModuleType } from '../Modules';
import { BaseClass, BaseClassConfig } from './BaseClass';

// TODO: resolve any type
export type BaseNetworkClassConnect = () => Promise<any>;
export interface BaseNetworkClassConfig extends BaseClassConfig {}

// TODO: import from EvmNetwork? Or make generic inteface in Core
interface ConnectResponse {
  chain: EvmChain | null;
  account: EvmAddress | null;
  // TODO: add types of Provider here in Core
  provider: any;
  connector: any;
}

export abstract class BaseNetworkClass extends BaseClass {
  type: CoreModuleType.NETWORK;

  constructor({ name, type = CoreModuleType.DEFAULT, core }: BaseNetworkClassConfig) {
    super({ name, type, core });
    this.type = CoreModuleType.NETWORK;
  }

  async connect(options?: Record<string, unknown>): Promise<ConnectResponse> {
    // TODO: throw moralis Error
    throw new Error('Not implemented');
  }

  // TODO: make this abstract
  async signMessage(message: string): Promise<string> {
    // TODO: throw moralis Error
    throw new Error('Not implemented');
  }
}
