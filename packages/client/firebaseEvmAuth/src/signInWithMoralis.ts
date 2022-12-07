import { EvmAuthClient } from '@moralisweb3/client-evm-auth';
import { User } from '@moralisweb3/client-backend-adapter-utils';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export interface SignInWithMoralisResponse {
  provider: JsonRpcProvider | Web3Provider;
  user: User;

  /**
   * @deprecated Use `.user` property instead.
   */
  credentials: User;
}

export async function signInWithMoralis(
  evmAuthClient: EvmAuthClient,
  providerName?: string,
): Promise<SignInWithMoralisResponse> {
  await evmAuthClient.authenticate(providerName);

  const user = await evmAuthClient.tryGetUser();
  if (!user) {
    throw new Error('Cannot read credentials');
  }

  return {
    provider: await evmAuthClient.restoreProvider(),
    credentials: user,
    user,
  };
}
