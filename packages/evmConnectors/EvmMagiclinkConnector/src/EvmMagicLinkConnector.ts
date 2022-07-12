import core, {
  EvmAddress,
  EvmChain,
  EvmConnection,
  EvmMagicLinkConnectorOptions,
  EvmProvider,
  MoralisCore,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { EthNetworkConfiguration, Magic } from 'magic-sdk';

const DEFAULT_OPTIONS = {
  chainId: '0x1',
};

export interface EvmMagiclinkConnectorConfig {
  core: MoralisCore;
}

/**
 * Connector for WalletConnect v1
 */
export class EvmMagiclinkConnector extends EvmAbstractConnector<EvmProvider, EvmMagicLinkConnectorOptions> {
  constructor(config: EvmMagiclinkConnectorConfig) {
    super({
      name: 'magic-link',
      core: config.core,
    });
  }

  protected async createProvider(options: EvmMagicLinkConnectorOptions): Promise<EvmProvider> {
    const magic = new Magic(options.apiKey, {
      network: EvmChain.create(options.chainId!).name as EthNetworkConfiguration,
    });

    // Log out of any previous sessions
    if (options.newSession) {
      await this.cleanup(magic);
    }

    await magic.auth.loginWithMagicLink({
      email: options.email,
    });

    const provider = magic.rpcProvider;

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create provider',
      });
    }

    return provider;
  }

  protected async createConnection(_options: EvmMagicLinkConnectorOptions): Promise<EvmConnection> {
    const options = { ...DEFAULT_OPTIONS, ..._options };

    this.logger.verbose('Connecting', { providedOptions: _options, options });

    const provider = await this.getProvider(options);

    const [accounts, chainId] = await Promise.all([
      provider.request({ method: 'eth_accounts' }) as Promise<string[]>,
      provider.request({ method: 'eth_chainId' }) as Promise<string>,
    ]);

    return {
      provider: provider,
      chain: new EvmChain(chainId),
      account: accounts[0] ? new EvmAddress(accounts[0]) : null,
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

const evmMagicLinkConnector = new EvmMagiclinkConnector({ core });
export default evmMagicLinkConnector;
