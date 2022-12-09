import { AuthClientError, AuthClientErrorCode } from '@moralisweb3/client-auth-utils';
import { SolConnector } from './SolConnector';
import { PhantomSolConnector } from './PhantomSolConnector';

const defaultConnector = new PhantomSolConnector();

export class SolConnectorResolver {
  public constructor(private readonly connectors: SolConnector[] | undefined) {}

  public resolve(name: string): SolConnector {
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
      message: `Cannot find Solana connector: ${name}`,
    });
  }
}
