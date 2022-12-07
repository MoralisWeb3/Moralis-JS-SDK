import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { AuthClientError, AuthClientErrorCode } from '@moralisweb3/client-auth-utils';
import { EvmWalletProvider } from './EvmWalletProvider';

export class DefaultEvmWalletProvider implements EvmWalletProvider {
  public readonly name = 'default';

  public async create(): Promise<Web3Provider | JsonRpcProvider> {
    const ethereum = await detectEthereumProvider();
    if (!ethereum) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'Ethereum provider is not available',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = new Web3Provider(ethereum as any, 'any');
    await provider.send('eth_requestAccounts', []);
    return provider;
  }
}
