import { Web3Provider } from '@ethersproject/providers';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import { WalletDetails } from '@moralisweb3/client-auth-utils';
import { Magic, MagicSDKAdditionalConfiguration } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

interface MagicSDK extends Magic {
  connect: ConnectExtension;
}

export interface MagicLinkEvmConnectorOptions extends MagicSDKAdditionalConfiguration {}

export class MagicLinkEvmConnector implements EvmConnector {
  public static create(apiKey: string, options?: MagicLinkEvmConnectorOptions): MagicLinkEvmConnector {
    return new MagicLinkEvmConnector(apiKey, options);
  }

  public readonly name = 'magicLink';
  private readonly magic: MagicSDK;
  private readonly options: MagicLinkEvmConnectorOptions;

  public constructor(apiKey: string, options: MagicLinkEvmConnectorOptions = {}) {
    this.options = {
      network: 'mainnet',
      ...options,
      extensions: [new ConnectExtension()],
    };

    this.magic = new Magic(apiKey, this.options) as unknown as MagicSDK;
  }

  public async connect(): Promise<EvmConnection> {
    const provider = this.magic.rpcProvider;
    await provider.enable();
    return new MagicLinkEvmConnection(this.name, this.magic);
  }
}

class MagicLinkEvmConnection implements EvmConnection {
  public readonly provider: Web3Provider;

  public constructor(public readonly connectorName: string, private readonly magic: MagicSDK) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.provider = new Web3Provider(magic as any);
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
    await this.magic.connect.disconnect();
    localStorage.removeItem(this.connectorName);
  }
}
