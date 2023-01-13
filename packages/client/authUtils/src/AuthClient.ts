import { User } from './User';

export interface AuthClient<WalletProvider> {
  connect(connectorName?: string): Promise<void>;
  isConnected(): boolean;

  authenticate(connectorName?: string): Promise<void>;
  isAuthenticated(): Promise<boolean>;

  tryGetUser(): Promise<User | null>;
  logOut(): Promise<void>;
  onClientDisconnect(callback: () => void | Promise<void>): void;

  restoreProvider(): Promise<WalletProvider>;
}
