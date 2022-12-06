import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { EvmProviderFactory, EvmProviderName } from './EvmAuthClientOptions';

export class Web3ProviderResolver {
  public constructor(private readonly providerFactory: EvmProviderFactory | undefined) {}

  public async resolve(name: EvmProviderName): Promise<JsonRpcProvider> {
    if (!this.providerFactory || name === 'default') {
      return getMetaMaskProvider();
    }
    return typeof this.providerFactory === 'function' ? this.providerFactory(name) : this.providerFactory;
  }
}

async function getMetaMaskProvider(): Promise<JsonRpcProvider> {
  const ethereum = await detectEthereumProvider();
  if (!ethereum) {
    throw new Error('Ethereum provider not found');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new Web3Provider(ethereum as any, 'any');
  await provider.send('eth_requestAccounts', []);
  return provider;
}
