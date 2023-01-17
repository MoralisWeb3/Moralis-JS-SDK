import { Connector } from './Connector';
import { User } from './User';

export interface AuthClient<WalletProvider> {
  hasConnector(connectorName: string): boolean;
  registerConnector(connectorName: string, Connector: Connector<WalletProvider>): void;

  connect(connectorName?: string): Promise<void>;
  isConnected(): boolean;

  authenticate(connectorName?: string): Promise<void>;
  isAuthenticated(): Promise<boolean>;

  tryGetUser(): Promise<User | null>;
  logOut(): Promise<void>;

  restoreProvider(): Promise<WalletProvider>;
}
