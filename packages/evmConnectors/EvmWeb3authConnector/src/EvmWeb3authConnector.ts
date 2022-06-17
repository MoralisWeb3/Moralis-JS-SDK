import {
  EvmAddress,
  EvmChain,
  EvmConnectResponse,
  MoralisNetworkConnectorError,
  EvmWeb3authConnectOptions,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import core from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { ethers } from 'ethers';
import { Web3Auth, Web3AuthOptions } from '@web3auth/web3auth';
import { SafeEventEmitterProvider } from '@web3auth/base';

/**
 * Connector for WalletConnect v1
 */
export class EvmWeb3authConnector extends EvmAbstractConnector {
  constructor() {
    super({
      name: 'web3auth',
      core,
    });
  }

  private async getProvider(web3auth: Web3Auth): Promise<SafeEventEmitterProvider> {
    if (this._provider) {
      return this._provider as any;
    }

    web3auth.loginModal.on('MODAL_VISIBILITY', async (visibility: boolean) => {
      if (!visibility) {
        new Error('Web3Auth: User closed login modal.');
      }
    });
    const provider = await web3auth.connect();

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create a WalletConnect provider',
      });
    }

    return provider;
  }

  async connect(_options: EvmWeb3authConnectOptions): Promise<EvmConnectResponse> {
    const chainId = EvmChain.create(_options.chainId || '0x1').apiHex;
    const options: Web3AuthOptions = {
      chainConfig: {
        chainId: chainId,
        chainNamespace: _options.chainConfig?.chainNamespace || 'eip155',
        ..._options.chainConfig,
      },
      uiConfig: {
        appLogo: _options.appLogo || 'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg',
        loginMethodsOrder: _options.loginMethodsOrder,
        theme: _options.theme || 'dark',
      },
      clientId: _options.clientId,
    };

    this.logger.verbose('Connecting', { providedOptions: _options, options });

    const web3auth = new Web3Auth(options as Web3AuthOptions);

    await web3auth.initModal();

    await this.getProvider(web3auth);

    const isSocialLogin = web3auth.provider ? false : true;
    const ether = new ethers.providers.Web3Provider(web3auth.provider || (web3auth as any));

    const signer = ether.getSigner();

    const account = await signer.getAddress();
    this.account = new EvmAddress(account);
    this.chain = new EvmChain(options.chainConfig.chainId!);
    this._provider = isSocialLogin ? ether : web3auth.provider;

    this.subscribeToEvents(this.provider!);

    return {
      provider: this.provider!,
      chain: this.chain,
      account: this.account,
    };
  }
}

const evmWeb3authConnector = new EvmWeb3authConnector();
export default evmWeb3authConnector;
