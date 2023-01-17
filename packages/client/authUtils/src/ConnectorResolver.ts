import { AuthClientError, AuthClientErrorCode } from './AuthClientError';
import { Connector } from './Connector';

export class ConnectorResolver<WalletProvider> {
  public constructor(
    private connectors: Connector<WalletProvider>[] | undefined,
    private readonly defaultConnector: Connector<WalletProvider>,
  ) {}

  public hasConnector(name: string): boolean {
    if (this.connectors) {
      return !!this.connectors.find((conn) => conn.name === name);
    }

    return name === this.defaultConnector.name;
  }

  public registerConnector(name: string, connector: Connector<WalletProvider>) {
    this.connectors = [...(this.connectors || []), connector];
  }

  public resolveName(name: string | undefined): string {
    return name || this.defaultConnector.name;
  }

  public resolve(name: string): Connector<WalletProvider> {
    if (this.connectors) {
      const connector = this.connectors.find((conn) => conn.name === name);
      if (connector) {
        return connector;
      }
    }

    if (name === this.defaultConnector.name) {
      return this.defaultConnector;
    }

    throw new AuthClientError({
      code: AuthClientErrorCode.GENERIC,
      message: `Cannot find connector by name: ${name}`,
    });
  }
}
