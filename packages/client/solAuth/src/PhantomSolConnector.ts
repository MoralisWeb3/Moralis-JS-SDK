import { AuthClientError, AuthClientErrorCode, WalletDetails } from '@moralisweb3/client-auth-utils';
import { SolanaProvider } from './SolanaProvider';
import { SolConnection, SolConnector } from './SolConnector';
import { encode } from 'bs58';

export interface PhantomSolConnectorOptions {
  network?: string;
}

export class PhantomSolConnector implements SolConnector {
  public static create(options?: PhantomSolConnectorOptions): PhantomSolConnector {
    return new PhantomSolConnector(options || {});
  }

  public readonly name = 'phantom';

  private constructor(private readonly options: PhantomSolConnectorOptions) {}

  public async connect(): Promise<SolConnection> {
    // eslint-disable-next-line
    const provider = (window as any)['solana'] as SolanaProvider | undefined;
    if (!provider) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'Solana provider is not available',
      });
    }

    if (!provider.isPhantom) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'This connector supports only Phantom wallet',
      });
    }

    await provider.connect();
    return new PhantomSolConnection(this.name, provider, this.options.network);
  }
}

class PhantomSolConnection implements SolConnection {
  public constructor(
    public readonly connectorName: string,
    public readonly provider: SolanaProvider,
    private readonly network: string | undefined,
  ) {}

  public async readWallet(): Promise<WalletDetails> {
    const address = this.provider.publicKey.toBase58();
    return {
      address,
      solNetwork: this.network || 'mainnet',
    };
  }

  public async signMessage(message: string): Promise<string> {
    const encodedMessage = new TextEncoder().encode(message);

    const signature = await this.provider.signMessage(encodedMessage);

    return encode(signature.signature);
  }

  public async disconnect(): Promise<void> {
    // Nothing...
  }
}
