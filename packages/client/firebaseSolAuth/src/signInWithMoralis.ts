import { signInWithCustomToken, UserCredential } from 'firebase/auth';
import { MoralisAuth, requestMessage, issueToken, SolanaNetwork } from '@moralisweb3/client-firebase-auth-utils';
import { encode } from 'bs58';
import { SolanaProvider } from './SolanaProvider';

export interface SignInWithMoralisOptions {
  provider?: SolanaProvider;
  network?: SolanaNetwork;
}

export interface SignInWithMoralisResponse {
  provider: SolanaProvider;
  credentials: UserCredential;
}

export async function signInWithMoralis(
  moralisAuth: MoralisAuth,
  options?: SignInWithMoralisOptions,
): Promise<SignInWithMoralisResponse> {
  const provider = options?.provider ?? getDefaultProvider();

  await provider.connect();

  const address = provider.publicKey.toBase58();
  const context = await requestMessage(moralisAuth, {
    networkType: 'solana',
    address,
    network: options?.network ?? 'mainnet',
  });

  const encodedMessage = new TextEncoder().encode(context.message);

  const signature = await provider.signMessage(encodedMessage);

  const token = await issueToken(moralisAuth, {
    context,
    signature: encode(signature.signature),
  });

  const credentials = await signInWithCustomToken(moralisAuth.auth, token);
  return {
    provider,
    credentials,
  };
}

function getDefaultProvider(): SolanaProvider {
  // eslint-disable-next-line
  const provider = (window as any)['solana'];
  if (!provider) {
    throw new Error('Solana provider not found');
  }
  if (!provider.isPhantom) {
    throw new Error('Phantom provider not found');
  }
  return provider;
}
