import { MoralisNetworkError, NetworkErrorCode } from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import MetamaskConnector from '@moralisweb3/evm-metamask-connector';

const DEFAULT_CONNECTORS: EvmAbstractConnector[] = [MetamaskConnector];

export class Connectors {
  private _connectors = new Map<string, EvmAbstractConnector>();

  constructor() {
    DEFAULT_CONNECTORS.forEach((connector) => this.register(connector));
  }

  /**
   * Register a new connector based on a EvmAbstractConnector
   */
  register = (connector: EvmAbstractConnector) => {
    if (this._connectors.has(connector.name)) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.DUPLICATE_WALLET,
        message: `The connector ${connector.name} has already been registered.`,
      });
    }

    this._connectors.set(connector.name, connector);
  };

  /**
   * Returns the connector with the given name.
   * This connector should have been registered with `register`
   * Throws an error if no connector with the given name has been registered.
   */
  get = (name: string): EvmAbstractConnector => {
    const module = this._connectors.get(name);

    if (!module) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.WALLET_NOT_FOUND,
        message: `Connector "${name}" does not exist.`,
      });
    }

    return module;
  };

  /**
   * Remove the connector with the provided name, if it has been registered,
   * or throws an error if the connector cannot be found.
   */
  remove = (name: string) => {
    const isRemoved = this._connectors.delete(name);

    if (!isRemoved) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.WALLET_NOT_FOUND,
        message: `Connector "${name}" does not exist.`,
      });
    }
  };

  /**
   * List all the registered connectors
   */
  list = () => {
    return Array.from(this._connectors.values());
  };

  /**
   * Returns the names of all registered connectors
   */
  get names() {
    return this.list().map((module) => module.name);
  }
}
