import { Web3Provider } from '@ethersproject/providers';
import { AuthClientError, AuthClientErrorCode, WalletDetails } from '@moralisweb3/client-auth-utils';
import { EvmConnection, EvmConnector } from './EvmConnector';
import detectEthereumProvider from '@metamask/detect-provider';

export class MetaMaskEvmConnector implements EvmConnector {
  public static create(): MetaMaskEvmConnector {
    return new MetaMaskEvmConnector();
  }

  public readonly name = 'metaMask';

  private constructor() {
    // Nothing...
  }

  public async connect(): Promise<EvmConnection> {
    const ethereum = await detectEthereumProvider();
    if (!ethereum) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'Ethereum provider is not available',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = new Web3Provider(ethereum as any, 'any');
    await provider.send('eth_requestAccounts', []);
    return new MetaMaskEvmConnection(this.name, provider, ethereum);
  }
}

class MetaMaskEvmConnection implements EvmConnection {
  public onClientDisconnect?: () => void | Promise<void>;

  public constructor(
    public readonly connectorName: string,
    public readonly provider: Web3Provider,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly ethereum: any,
  ) {
    this.ethereum.on('disconnect', () => {
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

  public signMessage(message: string): Promise<string> {
    const signer = this.provider.getSigner();
    return signer.signMessage(message);
  }

  public async disconnect(): Promise<void> {
    // Nothing...
  }
}
