import { User } from '@moralisweb3/client-backend-adapter-utils';

export interface AuthClient<Provider> {
  authenticate(walletProviderName?: string): Promise<void>;
  tryGetUser(): Promise<User | null>;
  isLoggedIn(): Promise<boolean>;
  logOut(): Promise<void>;
  restoreProvider(): Promise<Provider>;
}
