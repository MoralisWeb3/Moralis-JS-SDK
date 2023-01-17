import { AuthProvider, AuthSession, NetworkType } from '@moralisweb3/client-backend-adapter-utils';
import { AuthClient } from './AuthClient';
import { AuthClientError, AuthClientErrorCode } from './AuthClientError';
import { Connection, Connector } from './Connector';
import { ConnectorResolver } from './ConnectorResolver';
import { User } from './User';

export class AuthState<WalletProvider> implements AuthClient<WalletProvider> {
  private readonly storageKey: string;
  private connection: Connection<WalletProvider> | null = null;

  public constructor(
    private readonly networkType: NetworkType,
    private readonly authProvider: AuthProvider,
    private readonly connectorResolver: ConnectorResolver<WalletProvider>,
    private readonly storage: AuthStateStorage,
  ) {
    this.storageKey = `authClient${networkType.toUpperCase()}`;
  }

  public hasConnector(connectorName: string): boolean {
    return this.connectorResolver.hasConnector(connectorName);
  }

  public registerConnector(connectorName: string, connector: Connector<WalletProvider>): void {
    this.connectorResolver.registerConnector(connectorName, connector);
  }

  public async connect(connectorName?: string): Promise<void> {
    if (this.isConnected()) {
      throw new AuthClientError({
        code: AuthClientErrorCode.ALREADY_CONNECTED,
        message: 'You are already connected',
      });
    }

    connectorName = this.connectorResolver.resolveName(connectorName);
    this.connection = await this.initConnector(connectorName);
  }

  public async authenticate(connectorName?: string): Promise<void> {
    const auth = await this.authProvider.get();
    if (auth.tryGetSession()) {
      throw new AuthClientError({
        code: AuthClientErrorCode.ALREADY_AUTHENTICATED,
        message: 'You are already authenticated',
      });
    }

    connectorName = this.connectorResolver.resolveName(connectorName);

    if (!this.connection) {
      this.connection = await this.initConnector(connectorName);
    } else if (this.connection.connectorName !== connectorName) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: `Cannot authenticate to ${connectorName} connector, when you are connected to ${this.connection.connectorName} connector`,
      });
    }

    const wallet = await this.connection.readWallet();

    const response = await auth.getMessageToSign({
      networkType: this.networkType,
      address: wallet.address,
      evmChain: wallet.evmChain,
      solNetwork: wallet.solNetwork,
    });

    const signature = await this.connection.signMessage(response.message);

    await auth.signIn({
      networkType: this.networkType,
      message: response.message,
      signature,
    });
  }

  public async tryGetUser(): Promise<User | null> {
    const session = await this.tryGetSession();
    if (session) {
      return {
        address: session.address,
        networkType: session.networkType,
        isAuthenticated: true,
        profileId: session.profileId,
      };
    }

    if (this.isConnected()) {
      const connection = await this.restoreConnection();
      const wallet = await connection.readWallet();
      return {
        networkType: this.networkType,
        address: wallet.address,
        isAuthenticated: false,
      };
    }
    return null;
  }

  public isConnected(): boolean {
    return !!this.storage.getItem(this.storageKey);
  }

  public async isAuthenticated(): Promise<boolean> {
    return this.isConnected() && (await this.tryGetSession()) !== null;
  }

  public async restoreProvider(): Promise<WalletProvider> {
    const connection = await this.restoreConnection();
    return connection.provider;
  }

  public async logOut(): Promise<void> {
    let success = false;

    if (await this.isAuthenticated()) {
      const auth = await this.authProvider.get();
      await auth.signOut();
      success = true;
    }

    if (this.isConnected()) {
      if (this.connection) {
        await this.connection.disconnect();
        this.connection = null;
      }
      this.storage.removeItem(this.storageKey);
      success = true;
    }

    if (!success) {
      throw new AuthClientError({
        code: AuthClientErrorCode.NOT_AUTHENTICATED,
        message: 'You are not authenticated or connected',
      });
    }
  }

  private async initConnector(connectorName: string): Promise<Connection<WalletProvider>> {
    const connector = this.connectorResolver.resolve(connectorName);
    const connection = await connector.connect();

    this.storage.setItem(this.storageKey, connectorName);
    return connection;
  }

  private async restoreConnection(): Promise<Connection<WalletProvider>> {
    if (!this.connection) {
      const connectorName = this.storage.getItem(this.storageKey);
      if (!connectorName) {
        throw new AuthClientError({
          code: AuthClientErrorCode.NOT_CONNECTED,
          message: 'You are not connected',
        });
      }

      this.connection = await this.initConnector(connectorName);
    }
    return this.connection;
  }

  private async tryGetSession(): Promise<AuthSession | null> {
    const auth = await this.authProvider.get();
    const session = auth.tryGetSession();
    if (session && session.networkType === this.networkType) {
      return session;
    }
    return null;
  }
}

export interface AuthStateStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
