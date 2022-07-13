import {
  EvmAddress,
  EvmChain,
  EvmConnection,
  EvmMagicLinkConnectorOptions,
  EvmProvider,
  MoralisCore,
  MoralisCoreProvider,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { EthNetworkConfiguration, Magic } from 'magic-sdk';

const DEFAULT_OPTIONS = {
  chainId: '0x1',
};

/**
 * Connector for Magiclink
 */
export class EvmMagiclinkConnector extends EvmAbstractConnector<EvmProvider, EvmMagicLinkConnectorOptions> {
  public static readonly connectorName = 'magic-link';

  public static create(core?: MoralisCore): EvmMagiclinkConnector {
    return new EvmMagiclinkConnector(core || MoralisCoreProvider.getDefault());
  }

  constructor(core: MoralisCore) {
    super(EvmMagiclinkConnector.connectorName, core);
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
      chain: EvmChain.create(chainId),
      account: accounts.length > 0 ? EvmAddress.create(accounts[0]) : null,
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
