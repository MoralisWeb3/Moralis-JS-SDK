import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthProvider } from '@moralisweb3/client-backend-adapter-utils';
import { EvmAuthClientOptions } from './EvmAuthClientOptions';
import { AuthClient, AuthState, ConnectorResolver, User } from '@moralisweb3/client-auth-utils';
import { MetaMaskEvmConnector } from './MetaMaskEvmConnector';

export class EvmAuthClient implements Module, AuthClient<Web3Provider | JsonRpcProvider> {
  public static create(authProvider: AuthProvider, options?: EvmAuthClientOptions, core?: Core): EvmAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }

    const defaultConnector = MetaMaskEvmConnector.create();
    const connectorResolver = new ConnectorResolver(options?.connectors, defaultConnector);
    const state = new AuthState('evm', authProvider, connectorResolver, localStorage);
    return new EvmAuthClient(state);
  }

  public readonly name = 'evmAuthClient';

  private constructor(private readonly state: AuthState<Web3Provider | JsonRpcProvider>) {}

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

  public restoreProvider(): Promise<Web3Provider | JsonRpcProvider> {
    return this.state.restoreProvider();
  }
}
