import { NetworkType } from '@moralisweb3/client-backend-adapter-utils';

export interface AuthClient<WalletProvider> {
  connect(connectorName?: string): Promise<void>;
  isConnected(): boolean;

  authenticate(connectorName?: string): Promise<void>;
  isAuthenticated(): Promise<boolean>;

  tryGetUser(): Promise<User | null>;
  logOut(): Promise<void>;

  restoreProvider(): Promise<WalletProvider>;
}

export interface User {
  networkType: NetworkType;
  /**
   * @description Address of a user's wallet.
   */
  address: string;
  /**
   * @description Profile id of an authenticated user. If a user is not authenticated, this field is empty.
   */
  profileId?: string;
}
