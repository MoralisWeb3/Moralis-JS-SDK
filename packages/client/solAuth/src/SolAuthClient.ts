import { SolanaProvider } from './SolanaProvider';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthProvider } from '@moralisweb3/client-backend-adapter-utils';
import { SolAuthClientOptions } from './SolAuthClientOptions';
import { AuthClient, AuthState, ConnectorResolver, User } from '@moralisweb3/client-auth-utils';
import { PhantomSolConnector } from './PhantomSolConnector';

export class SolAuthClient implements Module, AuthClient<SolanaProvider> {
  public static create(authProvider: AuthProvider, options?: SolAuthClientOptions, core?: Core): SolAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }

    const defaultConnector = PhantomSolConnector.create();
    const connectorResolver = new ConnectorResolver(options?.connectors, defaultConnector);
    const state = new AuthState('solana', authProvider, connectorResolver, localStorage);
    return new SolAuthClient(state);
  }

  public readonly name = 'solAuthClient';

  private constructor(private readonly state: AuthState<SolanaProvider>) {}

  public connect(connectorName?: string): Promise<void> {
    return this.state.connect(connectorName);
  }

  public authenticate(connectorName?: string): Promise<void> {
    return this.state.authenticate(connectorName);
  }

  public tryGetUser(): Promise<User | null> {
    return this.state.tryGetUser();
  }

  public isConnected(): boolean {
    return this.state.isConnected();
  }

  public isAuthenticated(): Promise<boolean> {
    return this.state.isAuthenticated();
  }

  public logOut(): Promise<void> {
    return this.state.logOut();
  }

  public restoreProvider(): Promise<SolanaProvider> {
    return this.state.restoreProvider();
  }
}
