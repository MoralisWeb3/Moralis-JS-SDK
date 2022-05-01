import {
  EvmAddress,
  EvmChain,
  EvmConnectResponse,
  EvmWalletConnectConnectorOptions,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralis/core';
import core from '@moralis/core';
import { EvmAbstractConnector, getMoralisRpcs } from '@moralis/evm-connector-utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
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
  _provider: WalletConnectProvider | null = null;

  private getProvider(options: EvmWalletConnectConnectorOptions): WalletConnectProvider {
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

    // TODO: import default for CDN support?
    const provider = new WalletConnectProvider(config);

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
    // TODO: move setting the provider to an "init" function (in combination with eager connect?)
    const options = { ...defaultOptions, _options };

    this.logger.verbose('Connecting', { providedOptions: _options, options });

    // Log out of any previous sessions
    if (options.newSession) {
      this.cleanup();
    }

    const provider = this.getProvider(options);
    this._provider = provider;

    if (this._provider?.connected) {
      //TODO: cancel/abort?
    }

    const accounts = await provider.enable();
    this.account = accounts[0] ? new EvmAddress(accounts[0]) : null;
    this.chain = new EvmChain(provider.chainId);

    this.subscribeToEvents(this.provider!);

    return {
      provider: this.provider!,
      chain: this.chain,
      account: this.account,
    };
  }

  cleanup() {
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

const evmWalletConnectConnector = new EvmWalletconnectConnector();
export default evmWalletConnectConnector;
