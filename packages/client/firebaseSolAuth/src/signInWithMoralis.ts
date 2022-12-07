import { SolAuthClient, SolanaProvider } from '@moralisweb3/client-sol-auth';
import { User } from '@moralisweb3/client-backend-adapter-utils';

export interface SignInWithMoralisResponse {
  solanaProvider: SolanaProvider;
  user: User;

  /**
   * @deprecated Use `.user` property instead.
   */
  credentials: User;
}

export async function signInWithMoralis(solAuthClient: SolAuthClient): Promise<SignInWithMoralisResponse> {
  await solAuthClient.authenticate();
  const user = await solAuthClient.tryGetUser();
  if (!user) {
    throw new Error('Cannot read user');
  }

  return {
    solanaProvider: await solAuthClient.restoreProvider(),
    credentials: user,
    user,
  };
}
