import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import { WalletDetails } from '@moralisweb3/client-auth-utils';

interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

interface ProviderConnectInfo {
  readonly chainId: string;
}

interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export interface EIP1193EvmConnectorOptions {
  provider: Web3Provider;
}

export class EIP1193EvmConnector implements EvmConnector {
  public static create(options: EIP1193EvmConnectorOptions): EIP1193EvmConnector {
    return new EIP1193EvmConnector(options);
  }

  public readonly name = 'EIP1193';

  public constructor(private readonly options: EIP1193EvmConnectorOptions) {
    console.log(this.options);
  }

  public async connect(): Promise<EvmConnection> {
    return new EIP1193EvmConnection(this.name, this.options.provider);
  }
}

class EIP1193EvmConnection implements EvmConnection {
  public onClientDisconnect?: () => void | Promise<void>;

  public constructor(public readonly connectorName: string, public readonly provider: Web3Provider) {
    this.provider.on('disconnect', (error: ProviderRpcError) => {
      console.log('EVENT: disconnect');
      console.log(JSON.stringify(error));
      localStorage.removeItem(this.connectorName);
      this.onClientDisconnect?.();
    });
    this.provider.on('connect', (connectInfo: ProviderConnectInfo) => {
      console.log('EVENT: connect');
      console.log(JSON.stringify(connectInfo));
    });
    this.provider.on('chainChanged', (chainId: string) => {
      console.log('EVENT: chainChanged');
      console.log(JSON.stringify(chainId));
    });
    this.provider.on('accountsChanged', (accounts: string[]) => {
      console.log('EVENT: accountsChanged');
      console.log(JSON.stringify(accounts));
    });
    this.provider.on('message', (message: ProviderMessage) => {
      console.log('EVENT: message');
      console.log(JSON.stringify(message));
    });
  }

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
    localStorage.removeItem(this.connectorName);
  }
}
