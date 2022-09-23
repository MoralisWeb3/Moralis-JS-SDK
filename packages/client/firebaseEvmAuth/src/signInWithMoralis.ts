import { signInWithCustomToken, UserCredential } from '@firebase/auth';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { MoralisAuth, requestMessage, issueToken } from '@moralisweb3/client-firebase-auth-utils';
import detectEthereumProvider from '@metamask/detect-provider';

export interface SignInWithMoralisOptions {
  /**
   * @description Custom Ethereum provider.
   */
  provider?: JsonRpcProvider;
}

export interface SignInWithMoralisResponse {
  provider: JsonRpcProvider;
  credentials: UserCredential;
}

export async function signInWithMoralis(
  moralisAuth: MoralisAuth,
  options?: SignInWithMoralisOptions,
): Promise<SignInWithMoralisResponse> {
  const provider = options?.provider ?? (await getDefaultProvider());

  const signer = provider.getSigner();
  const [address, chain] = await Promise.all([
    signer.getAddress(),
    provider.send('eth_chainId', []),
  ]);

  const context = await requestMessage(moralisAuth, {
    networkType: 'evm',
    address,
    chain
  });

  const signature = await signer.signMessage(context.message);

  const token = await issueToken(moralisAuth, {
    context,
    signature,
  });

  const credentials = await signInWithCustomToken(moralisAuth.auth, token);
  return {
    provider,
    credentials,
  };
}

async function getDefaultProvider(): Promise<JsonRpcProvider> {
  const provider = await detectEthereumProvider();
  if (!provider) {
    throw new Error('Ethereum provider not found');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Web3Provider(provider as any, 'any');
}
