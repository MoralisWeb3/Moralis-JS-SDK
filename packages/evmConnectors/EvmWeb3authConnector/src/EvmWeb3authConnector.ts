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
import { Web3Auth, Web3AuthOptions } from '@web3auth/web3auth';
import { SafeEventEmitterProvider, ADAPTER_EVENTS } from '@web3auth/base';

const DEFAULT_OPTIONS: Omit<EvmWeb3authConnectOptions, 'clientId'> = {
  theme: 'dark',
  appLogo: 'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg',
  chainId: '0x1',
};
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

    const provider = await web3auth.connect();

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create a provider',
      });
    }

    return provider;
  }

  async connect(_options: EvmWeb3authConnectOptions): Promise<EvmConnectResponse> {
    const params = { ...DEFAULT_OPTIONS, ..._options };
    const options: Web3AuthOptions = {
      chainConfig: {
        chainId: EvmChain.create(params.chainId!).apiHex,
        chainNamespace: 'eip155',
      },
      uiConfig: {
        appLogo: params.appLogo,
        loginMethodsOrder: params.loginMethodsOrder,
        theme: params.theme,
      },
      clientId: params.clientId,
    };

    this.logger.verbose('Connecting', { providedOptions: _options, params });

    const web3auth = new Web3Auth(options);

    if (params.newSession) {
      web3auth.clearCache();
    }

    await web3auth.initModal();

    try {
      this.subscribeAuthEvents(web3auth);
    } catch (error) {
      this.logger.error('Failed to subscribe to auth events', { error });
    }

    const provider = await this.getProvider(web3auth);

    const [chainId, accounts] = await Promise.all([
      provider?.request({ method: 'eth_chainId' }) as Promise<string>,
      provider?.request({ method: 'eth_accounts' }) as Promise<string[]>,
    ]);

    this.account = accounts[0] ? new EvmAddress(accounts[0]) : null;
    this.chain = new EvmChain(chainId!);
    this._provider = web3auth.provider;

    this.subscribeToEvents(this.provider!);

    return {
      provider: this.provider!,
      chain: this.chain,
      account: this.account,
    };
  }

  subscribeAuthEvents(web3auth: Web3Auth) {
    web3auth.loginModal.on('MODAL_VISIBILITY', async (visibility: boolean) => {
      if (!visibility) {
        if (web3auth.status !== 'connected') {
          this.logger.verbose('Modal closed, canceling connection request');
          web3auth.emit(ADAPTER_EVENTS.ERRORED, { name: 'Web3Auth', message: 'User closed login modal' });
          web3auth.loginModal.closeModal();
        }
      }
    });
  }
}

const evmWeb3authConnector = new EvmWeb3authConnector();
export default evmWeb3authConnector;
