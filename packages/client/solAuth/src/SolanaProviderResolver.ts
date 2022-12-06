import { SolanaProvider } from './SolanaProvider';
import { SolProviderFactory, SolProviderName } from './SolAuthClientOptions';

export class SolanaProviderResolver {
  public constructor(private readonly providerFactory: SolProviderFactory | undefined) {}

  public async resolve(name: SolProviderName): Promise<SolanaProvider> {
    if (!this.providerFactory || name === 'default') {
      return getPhantomProvider();
    }
    return typeof this.providerFactory === 'function' ? this.providerFactory(name) : this.providerFactory;
  }
}

function getPhantomProvider(): SolanaProvider {
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
