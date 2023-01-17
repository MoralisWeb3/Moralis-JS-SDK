import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import { WalletDetails } from '@moralisweb3/client-auth-utils';
import {
  ProviderAccounts,
  ProviderChainId,
  ProviderInfo,
  ProviderMessage,
  ProviderRpcError,
  RequestArguments,
} from 'eip1193-provider';

// Lib Interface inherits from EventEmitter, which adds some methods (once, removeListener, off)
// to the interface that are not strictly part of EIP1193
export interface EIP1193Provider {
  on(event: 'connect', listener: (info: ProviderInfo) => void): void;
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  on(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  on(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
  request(args: RequestArguments): Promise<unknown>;
}

export interface EIP1193EvmConnectorOptions {
  provider: EIP1193Provider;
  onDisconnect?: () => void | Promise<void>;
  onChainChanged?: (chain: ProviderChainId) => void | Promise<void>;
  onAccountChanged?: (accounts: ProviderAccounts) => void | Promise<void>;
  onMessage?: (message: ProviderMessage) => void | Promise<void>;
}

export class EIP1193EvmConnector implements EvmConnector {
  public static create(options: EIP1193EvmConnectorOptions): EIP1193EvmConnector {
    return new EIP1193EvmConnector(options);
  }

  public readonly name = 'EIP1193';

  public constructor(private readonly options: EIP1193EvmConnectorOptions) {}

  public async connect(): Promise<EvmConnection> {
    const connection = new EIP1193EvmConnection(this.name, this.options.provider);
    connection.onClientDisconnect = this.options.onDisconnect;
    connection.onChainChanged = this.options.onChainChanged;
    connection.onAccountChanged = this.options.onAccountChanged;

    return connection;
  }
}

class EIP1193EvmConnection implements EvmConnection {
  public readonly provider: Web3Provider;
  public onClientDisconnect?: () => void | Promise<void>;
  public onChainChanged?: (chain: ProviderChainId) => void | Promise<void>;
  public onAccountChanged?: (accounts: ProviderAccounts) => void | Promise<void>;
  public onMessage?: (message: ProviderMessage) => void | Promise<void>;

  public constructor(public readonly connectorName: string, public readonly eip1193provider: EIP1193Provider) {
    this.provider = new Web3Provider(eip1193provider, 'any');

    this.eip1193provider.on('disconnect', (error: ProviderRpcError) => {
      console.log('EVENT: disconnect', JSON.stringify(error));
      localStorage.removeItem(this.connectorName);
      this.onClientDisconnect?.();
    });
    this.eip1193provider.on('connect', (connectInfo: ProviderInfo) => {
      console.log('EVENT: connect', JSON.stringify(connectInfo));
    });
    this.eip1193provider.on('chainChanged', (chainId: ProviderChainId) => {
      console.log('EVENT: chainChanged', JSON.stringify(chainId));
      this.onChainChanged?.(chainId);
    });
    this.eip1193provider.on('accountsChanged', (accounts: ProviderAccounts) => {
      console.log('EVENT: accountsChanged', JSON.stringify(accounts));
      this.onAccountChanged?.(accounts);
    });
    this.eip1193provider.on('message', (message: ProviderMessage) => {
      console.log('EVENT: message', JSON.stringify(message));
      this.onMessage?.(message);
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
