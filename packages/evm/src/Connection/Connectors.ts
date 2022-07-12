import { MoralisCore, MoralisCoreProvider, MoralisNetworkError, NetworkErrorCode } from '@moralisweb3/core';
import { ConnectorFactory, EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import MetamaskConnector from '@moralisweb3/evm-metamask-connector';

const DEFAULT_CONNECTORS: ConnectorFactory[] = [MetamaskConnector];

export class Connectors {
  private _connectors = new Map<string, EvmAbstractConnector>();

  public static create(): Connectors {
    const core = MoralisCoreProvider.getDefault(); // TODO
    const connectors = new Connectors(core);
    DEFAULT_CONNECTORS.forEach((connector) => connectors.register(connector));
    return connectors;
  }

  public constructor(private readonly core: MoralisCore) {}

  /**
   * Register a new connector based on a EvmAbstractConnector
   */
  public register = (connector: EvmAbstractConnector | ConnectorFactory) => {
    if ('create' in connector) {
      connector = connector.create(this.core);
    }
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
  get = <Connector extends EvmAbstractConnector = EvmAbstractConnector>(name: string): Connector => {
    const module = this._connectors.get(name);

    if (!module) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.WALLET_NOT_FOUND,
        message: `Connector "${name}" does not exist.`,
      });
    }

    return module as Connector;
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
