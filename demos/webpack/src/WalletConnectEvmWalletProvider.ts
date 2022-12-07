import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { EvmWalletProvider } from '@moralisweb3/client-evm-auth';

export class WalletConnectEvmWalletProvider implements EvmWalletProvider {
  public static create(): WalletConnectEvmWalletProvider {
    return new WalletConnectEvmWalletProvider();
  }

  public readonly name = 'walletconnect';

  public async create(): Promise<Web3Provider> {
    const provider = new WalletConnectProvider({
      infuraId: '84842078b09946638c03157f83405213',
      /*rpc: {
        1: 'https://replace_me/',
      },*/
    });

    await provider.enable();
    return new Web3Provider(provider);
  }
}
