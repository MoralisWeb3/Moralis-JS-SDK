import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { IWalletConnectProviderOptions } from '@walletconnect/types';
import { WalletDetails } from '@moralisweb3/client-auth-utils';

export interface WalletConnectEvmConnectorOptions extends IWalletConnectProviderOptions {}

export class WalletConnectEvmConnector implements EvmConnector {
  public static create(options: WalletConnectEvmConnectorOptions): WalletConnectEvmConnector {
    return new WalletConnectEvmConnector(options);
  }

  public readonly name = 'walletConnect';

  public constructor(private readonly options: WalletConnectEvmConnectorOptions) {}

  public async connect(): Promise<EvmConnection> {
    const provider = new WalletConnectProvider(this.options);
    await provider.enable();
    return new WalletConnectEvmConnection(this.name, new Web3Provider(provider));
  }
}

class WalletConnectEvmConnection implements EvmConnection {
  public constructor(public readonly connectorName: string, public readonly provider: Web3Provider) {}

  public async readWallet(): Promise<WalletDetails> {
    const [accounts, chain] = await Promise.all([
      this.provider.send('eth_accounts', []),
      this.provider.send('eth_chainId', []),
    ]);
    return {
      address: accounts[0],
      evmChain: chain,
    };
  }

  public async signMessage(message: string): Promise<string> {
    const signer = this.provider.getSigner();
    return signer.signMessage(message);
  }

  public async disconnect(): Promise<void> {
    localStorage.removeItem('walletconnect');
  }
}
