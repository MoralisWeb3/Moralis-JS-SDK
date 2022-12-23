import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import { WalletDetails } from '@moralisweb3/client-auth-utils';
import { Magic, MagicSDKAdditionalConfiguration } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

export interface MagicLinkEvmConnectorOptions extends MagicSDKAdditionalConfiguration {}

export class MagicLinkEvmConnector implements EvmConnector {
  public static create(apiKey: string, options?: MagicLinkEvmConnectorOptions): MagicLinkEvmConnector {
    return new MagicLinkEvmConnector(apiKey, options);
  }

  public readonly name = 'magicLink';
  private readonly magic: Magic;
  private readonly options: MagicLinkEvmConnectorOptions;

  public constructor(apiKey: string, options: MagicLinkEvmConnectorOptions = {}) {
    this.options = {
      network: 'mainnet',
      ...options,
      extensions: [new ConnectExtension(), ...(options.extensions ?? [])],
    };

    this.magic = new Magic(apiKey, this.options);
  }

  public async connect(): Promise<EvmConnection> {
    const provider = this.magic.rpcProvider;
    await provider.enable();
    // @ts-ignore
    return new MagicLinkEvmConnection(this.name, new Web3Provider(provider), this.magic);
  }
}

class MagicLinkEvmConnection implements EvmConnection {
  public constructor(
    public readonly connectorName: string,
    public readonly provider: Web3Provider,
    private readonly magic: Magic,
  ) {}

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
    // @ts-ignore
    await this.magic.connect.disconnect();
    localStorage.removeItem('magicLink');
  }
}
