import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { EvmWalletProvider } from '@moralisweb3/client-evm-auth';

export class WalletConnectEvmProviderFactory implements EvmWalletProvider {
  public static create(): WalletConnectEvmProviderFactory {
    return new WalletConnectEvmProviderFactory();
  }

  public readonly name = 'walletconnect';

  public async create(): Promise<Web3Provider> {
    const provider = new WalletConnectProvider({
      rpc: {
        1: 'https://replace_me/',
      },
    });

    await provider.enable();
    return new Web3Provider(provider);
  }
}
