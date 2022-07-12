import {
  EvmAddress,
  EvmChain,
  EvmConnection,
  EvmWalletConnectConnectorOptions,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
  MoralisCore,
  MoralisCoreProvider,
} from '@moralisweb3/core';
import { EvmAbstractConnector, getMoralisRpcs } from '@moralisweb3/evm-connector-utils';
import { WalletConnectProviderWrapper } from '@moralisweb3/wallet-connect-wrapper';
import { IWalletConnectProviderOptions } from '@walletconnect/types';

const WALLET_CONNECT_RPC_KEY = 'WalletConnect';

const defaultOptions: EvmWalletConnectConnectorOptions = {
  chainId: 1,
  newSession: false,
};

/**
 * Connector for WalletConnect v1
 */
export class EvmWalletConnectConnector extends EvmAbstractConnector<
  WalletConnectProviderWrapper,
  EvmWalletConnectConnectorOptions
> {
  public static readonly connectorName = 'wallet-connect';

  public static create(core?: MoralisCore): EvmWalletConnectConnector {
    return new EvmWalletConnectConnector(core || MoralisCoreProvider.getDefault());
  }

  constructor(core: MoralisCore) {
    super(EvmWalletConnectConnector.connectorName, core);
  }

  protected async createProvider(options?: EvmWalletConnectConnectorOptions): Promise<WalletConnectProviderWrapper> {
    const rpc = getMoralisRpcs(WALLET_CONNECT_RPC_KEY);
    const chainId = options?.chainId ? EvmChain.create(options.chainId, this.core) : undefined;

    const config: IWalletConnectProviderOptions = {
      rpc,
      chainId: chainId?.decimal,
      qrcodeModalOptions: {
        mobileLinks: options?.mobileLinks,
      },
    };

    const provider = new WalletConnectProviderWrapper(config);

    // Should not happen but in theory, but lets be safe
    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create a WalletConnect provider',
      });
    }
    return provider;
  }

  protected async createConnection(options?: EvmWalletConnectConnectorOptions): Promise<EvmConnection> {
    const finalOptions = { ...defaultOptions, options };
    this.logger.verbose('Connecting', { providedOptions: options, options: finalOptions });

    // Log out of any previous sessions
    if (finalOptions.newSession) {
      this.cleanup();
    }

    const provider = await this.getProvider(options);
    const accounts = await provider.enable();
    return {
      provider: provider,
      chain: EvmChain.create(provider.chainId, this.core),
      account: accounts[0] ? EvmAddress.create(accounts[0], this.core) : null,
    };
  }

  public cleanup() {
    try {
      if (window) {
        window.localStorage.removeItem('walletconnect');
      }
    } catch (error) {
      // Do nothing
    }
  }

  // async deactivate() {
  //   if (this._provider) {
  //     this.unsubscribeToEvents(this.provider as EvmProvider);

  //     try {
  //       await this._provider.close();
  //     } catch {
  //       // Do nothing
  //     }
  //   }

  //   this._provider = null;
  //   this.chain = null;
  //   this.account = null;
  // }
}
