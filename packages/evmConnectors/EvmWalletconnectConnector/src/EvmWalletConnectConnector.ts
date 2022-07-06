import {
  EvmAddress,
  EvmChain,
  EvmConnectResponse,
  EvmWalletConnectConnectorOptions,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import core from '@moralisweb3/core';
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
export class EvmWalletconnectConnector extends EvmAbstractConnector {
  constructor() {
    super({
      name: 'wallet-connect',
      core,
    });
  }

  // Internal provider, is typed as WalletConnectProvider and has more options than our "basic" EvmProvider typed
  _provider: WalletConnectProviderWrapper | null = null;

  private getProvider(options: EvmWalletConnectConnectorOptions): WalletConnectProviderWrapper {
    if (this._provider) {
      return this._provider;
    }

    const rpc = getMoralisRpcs(WALLET_CONNECT_RPC_KEY);
    const chainId = options.chainId ? new EvmChain(options.chainId) : undefined;

    const config: IWalletConnectProviderOptions = {
      rpc,
      chainId: chainId?.decimal,
      qrcodeModalOptions: {
        mobileLinks: options.mobileLinks,
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

  async connect(_options?: Partial<EvmWalletConnectConnectorOptions>): Promise<EvmConnectResponse> {
    const options = { ...defaultOptions, _options };

    this.logger.verbose('Connecting', { providedOptions: _options, options });

    // Log out of any previous sessions
    if (options.newSession) {
      this.cleanup();
    }

    const provider = this.getProvider(options);
    this._provider = provider;

    const accounts = await provider.enable();
    this.account = accounts[0] ? new EvmAddress(accounts[0]) : null;
    this.chain = new EvmChain(provider.chainId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.subscribeToEvents(this.provider!);

    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      provider: this.provider!,
      chain: this.chain,
      account: this.account,
    };
  }

  async cancelRequest() {
    if (this._provider) {
      await this._provider.disconnect();
    }
    throw new MoralisNetworkConnectorError({
      code: NetworkConnectorErrorCode.GENERIC_NETWORK_CONNECTOR_ERROR,
      message: 'No pending request to cancel',
    });
  }

  cleanup() {
    try {
      if (window) {
        window.localStorage.removeItem('walletconnect');
      }
    } catch (error) {
      this.logger.verbose('Failed to cleanup', { error });
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

const evmWalletConnectConnector = new EvmWalletconnectConnector();
export default evmWalletConnectConnector;
