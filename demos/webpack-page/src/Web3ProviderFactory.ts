import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';

export async function web3providerFactory(name: string): Promise<Web3Provider> {
  if (name === 'walletconnect') {
    const provider = new WalletConnectProvider({
      /*rpc: {
        1: 'https://replace_me/',
      },*/
    });

    await provider.enable();
    return new Web3Provider(provider);
  }

  throw new Error(`Unknown web3 provider: ${name}`);
}
