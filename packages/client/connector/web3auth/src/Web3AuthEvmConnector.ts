import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import { WalletDetails } from '@moralisweb3/client-auth-utils';
import { ADAPTER_EVENTS } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

export interface Web3AuthEvmConnectorOptions {}

export class Web3AuthEvmConnector implements EvmConnector {
  public static create(apiKey: string, options?: Web3AuthEvmConnectorOptions): Web3AuthEvmConnector {
    return new Web3AuthEvmConnector(apiKey, options);
  }

  public readonly name = 'web3Auth';
  private readonly web3auth: Web3Auth;
  private readonly options: Web3AuthEvmConnectorOptions;

  public constructor(clientId: string, options: Web3AuthEvmConnectorOptions = {}) {
    this.options = options;

    this.web3auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: 'eip155',
        chainId: '0x1',
      },
      ...this.options,
    });
  }

  public async connect(): Promise<EvmConnection> {
    await this.web3auth.initModal();
    await this.web3auth.connect();
    return new Web3AuthEvmConnection(this.name, this.web3auth);
  }
}

class Web3AuthEvmConnection implements EvmConnection {
  public readonly provider: Web3Provider;
  public onClientDisconnect?: () => void | Promise<void>;

  public constructor(public readonly connectorName: string, private readonly web3auth: Web3Auth) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.provider = new Web3Provider(web3auth.provider as any);
    this.web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      localStorage.removeItem(this.connectorName);
      this.onClientDisconnect?.();
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
    await this.web3auth.logout();
    localStorage.removeItem(this.connectorName);
  }
}
