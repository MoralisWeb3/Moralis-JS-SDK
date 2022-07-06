import { AbstractProvider } from 'web3-core/types';
import {
  EvmAddress,
  EvmChain,
  EvmConnectResponse,
  EvmMagicLinkConnectorOptions,
  EvmProvider,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import core from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { EthNetworkConfiguration, Magic } from 'magic-sdk';

const DEFAULT_OPTIONS = {
  chainId: '0x1',
};

/**
 * Connector for WalletConnect v1
 */
export class EvmMagiclinkConnector extends EvmAbstractConnector {
  constructor() {
    super({
      name: 'magic-link',
      core,
    });
  }

  // TODO: Implement with proper typings
  private getProvider(magic: Magic): EvmProvider {
    if (this._provider) {
      return this._provider as EvmProvider;
    }

    const provider = magic.rpcProvider;

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create provider',
      });
    }

    return provider;
  }

  async connect(_options: EvmMagicLinkConnectorOptions): Promise<EvmConnectResponse> {
    const options = { ...DEFAULT_OPTIONS, ..._options };

    this.logger.verbose('Connecting', { providedOptions: _options, options });

    const magic = new Magic(options.apiKey, {
      network: EvmChain.create(options.chainId).name as EthNetworkConfiguration,
    });

    // Log out of any previous sessions
    if (options.newSession) {
      await this.cleanup(magic);
    }

    const provider = this.getProvider(magic);

    await magic.auth.loginWithMagicLink({
      email: options.email,
    });

    const [accounts, chainId] = await Promise.all([
      provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
      provider.request({ method: 'eth_chainId' }) as Promise<string>,
    ]);
    this._provider = provider;

    this.account = accounts[0] ? new EvmAddress(accounts[0]) : null;
    this.chain = new EvmChain(chainId);

    this.subscribeToEvents(this.provider!);

    return {
      provider: this.provider!,
      chain: this.chain,
      account: this.account,
    };
  }

  async cleanup(magic: Magic): Promise<void> {
    if (magic.user) {
      try {
        await magic.user.logout();
      } catch (error) {
        this.logger.verbose('Failed to logout', { error });
      }
    }
  }
}

const evmMagicLinkConnector = new EvmMagiclinkConnector();
export default evmMagicLinkConnector;
