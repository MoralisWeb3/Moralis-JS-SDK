import { EvmConnector } from './EvmConnector';
import { MetaMaskEvmConnector } from './MetaMaskEvmConnector';
import { AuthClientError, AuthClientErrorCode, ConnectorResolver } from '@moralisweb3/client-auth-utils';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

const defaultConnector = new MetaMaskEvmConnector();

export class EvmConnectorResolver implements ConnectorResolver<JsonRpcProvider | Web3Provider> {
  public constructor(private readonly connectors: EvmConnector[] | undefined) {}

  public resolve(name: string): EvmConnector {
    if (!name || name === defaultConnector.name) {
      return defaultConnector;
    }
    if (this.connectors) {
      const connector = this.connectors.find((conn) => conn.name === name);
      if (connector) {
        return connector;
      }
    }

    throw new AuthClientError({
      code: AuthClientErrorCode.GENERIC,
      message: `Cannot find EVM connector: ${name}`,
    });
  }
}
