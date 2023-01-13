import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import { WalletDetails } from '@moralisweb3/client-auth-utils';
import { sequence, Wallet } from '0xsequence';

export interface SequenceEvmConnectorOptions {
  network?: string;
  providerConfig?: sequence.ProviderConfig;
  connectConfig?: sequence.provider.ConnectOptions;
}

// To use another network, such as 'mainnet' user will need to deploy their wallet contract to that network.
const DEFAULT_NETWORK = 'polygon';

export class SequenceEvmConnector implements EvmConnector {
  public static create(options?: SequenceEvmConnectorOptions): SequenceEvmConnector {
    return new SequenceEvmConnector(options);
  }

  public readonly name = '0xSequence';
  private readonly sequence: Promise<Wallet>;
  private readonly options: SequenceEvmConnectorOptions;

  public constructor(options: SequenceEvmConnectorOptions = {}) {
    this.options = options;
    this.sequence = sequence.initWallet(this.options.network || DEFAULT_NETWORK, this.options.providerConfig);
  }

  public async connect(): Promise<EvmConnection> {
    const wallet = await this.sequence;
    await wallet.connect(this.options.connectConfig);
    return new SequenceEvmConnection(this.name, wallet);
  }
}

class SequenceEvmConnection implements EvmConnection {
  public readonly provider: Web3Provider;
  public onClientDisconnect?: () => void | Promise<void>;

  public constructor(public readonly connectorName: string, private readonly wallet: Wallet) {
    const provider = this.wallet.getProvider();
    if (!provider) {
      throw new Error('No 0xSequence provider found');
    }
    this.provider = provider;
    this.wallet.on('disconnect', () => {
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
    this.wallet.disconnect();
    localStorage.removeItem(this.connectorName);
  }
}
