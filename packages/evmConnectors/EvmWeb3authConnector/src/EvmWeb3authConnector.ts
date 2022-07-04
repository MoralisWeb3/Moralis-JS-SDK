import {
  EvmAddress,
  EvmChain,
  EvmConnectResponse,
  MoralisNetworkConnectorError,
  EvmWeb3authConnectOptions,
  NetworkConnectorErrorCode,
  ChainNamespaceType,
} from '@moralisweb3/core';
import core from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { Web3Auth, Web3AuthOptions } from '@web3auth/web3auth';
import { SafeEventEmitterProvider } from '@web3auth/base';

const DEFAULT_OPTIONS: Omit<EvmWeb3authConnectOptions, 'clientId'> = {
  theme: 'dark',
  appLogo: 'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg',
  chainId: '0x1',
  chainNamespace: 'eip155',
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
        chainNamespace: params.chainNamespace as ChainNamespaceType,
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

    this.subscribeAuthEvents(web3auth);

    if (params.newSession) {
      web3auth.clearCache();
    }

    await web3auth.initModal();

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
        // TODO: Cancel connection request if modal is closed (handle in cancel connection issue)
        if (web3auth.status != 'connected') {
          throw new MoralisNetworkConnectorError({
            code: NetworkConnectorErrorCode.GENERIC_NETWORK_CONNECTOR_ERROR,
            message: 'Web3Auth: User closed login modal.',
          });
        }
      }
    });
  }
}

const evmWeb3authConnector = new EvmWeb3authConnector();
export default evmWeb3authConnector;
