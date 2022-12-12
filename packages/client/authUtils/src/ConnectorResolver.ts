import { AuthClientError, AuthClientErrorCode } from './AuthClientError';
import { Connector } from './Connector';

export class ConnectorResolver<WalletProvider> {
  public constructor(
    private readonly connectors: Connector<WalletProvider>[] | undefined,
    private readonly defaultConnector: Connector<WalletProvider>,
  ) {}

  public resolveName(name: string | undefined): string {
    return name || this.defaultConnector.name;
  }

  public resolve(name: string): Connector<WalletProvider> {
    if (name === this.defaultConnector.name) {
      return this.defaultConnector;
    }

    if (this.connectors) {
      const connector = this.connectors.find((conn) => conn.name === name);
      if (connector) {
        return connector;
      }
    }

    throw new AuthClientError({
      code: AuthClientErrorCode.GENERIC,
      message: `Cannot find connector by name: ${name}`,
    });
  }
}
