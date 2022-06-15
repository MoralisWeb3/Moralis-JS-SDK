import {
  EvmAddress,
  EvmChain,
  EvmConnectResponse,
  EvmMagicLinkConnectorOptions,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import core from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { ethers } from 'ethers';
import { EthNetworkConfiguration, Magic } from 'magic-sdk';

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

  private getProvider(magic: Magic): ethers.providers.Web3Provider {
    if (this._provider) {
      return this._provider as ethers.providers.Web3Provider;
    }

    // TODO: Replace any with proper type
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider as any);

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create provider',
      });
    }

    return provider;
  }

  async connect(_options: EvmMagicLinkConnectorOptions): Promise<EvmConnectResponse> {
    const options = { ..._options };
    if (!options.chainId) {
      options.chainId = 1;
    }

    this.logger.verbose('Connecting', { providedOptions: _options, options });

    const magic = new Magic(options.apiKey, {
      network: EvmChain.create(options.chainId).name as EthNetworkConfiguration,
    });

    // Log out of any previous sessions
    if (options.newSession) {
      this.cleanup(magic);
    }

    const web3Provider = this.getProvider(magic);
    this._provider = web3Provider.provider;

    await magic.auth.loginWithMagicLink({
      email: options.email,
    });

    const signer = web3Provider.getSigner();

    const account = await signer.getAddress();
    this.account = new EvmAddress(account);
    this.chain = new EvmChain(options.chainId);

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
        // Do nothing
      }
    }
  }
}

const evmMagicLinkConnector = new EvmMagiclinkConnector();
export default evmMagicLinkConnector;
