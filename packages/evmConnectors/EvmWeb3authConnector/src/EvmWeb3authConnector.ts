import core, {
  EvmAddress,
  MoralisCore,
  EvmChain,
  MoralisNetworkConnectorError,
  EvmWeb3authConnectOptions,
  NetworkConnectorErrorCode,
  EvmProvider,
  EvmConnection,
} from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { Web3Auth, Web3AuthOptions } from '@web3auth/web3auth';
import { SafeEventEmitterProvider, ADAPTER_EVENTS } from '@web3auth/base';

const DEFAULT_OPTIONS: Omit<EvmWeb3authConnectOptions, 'clientId'> = {
  theme: 'dark',
  appLogo: 'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg',
  chainId: '0x1',
};

export type Web3AuthProvider = EvmProvider & SafeEventEmitterProvider;

export interface EvmWeb3authConnectorConfig {
  core: MoralisCore;
}
export class EvmWeb3authConnector extends EvmAbstractConnector<Web3AuthProvider, EvmWeb3authConnectOptions> {
  listnerCount = 0;
  constructor(config: EvmWeb3authConnectorConfig) {
    super({
      name: 'web3auth',
      core: config.core,
    });
  }

  protected async createProvider(params: EvmWeb3authConnectOptions): Promise<Web3AuthProvider> {
    const options: Web3AuthOptions = {
      chainConfig: {
        chainId: EvmChain.create(params.chainId!).apiHex,
        chainNamespace: 'eip155',
        ...(params.displayName && { displayName: params.displayName }),
        ...(params.rpcTarget && { rpcTarget: params.rpcTarget }),
        ...(params.ticker && { ticker: params.ticker }),
        ...(params.tickerName && { tickerName: params.tickerName }),
      },
      uiConfig: {
        appLogo: params.appLogo,
        loginMethodsOrder: params.loginMethodsOrder,
        theme: params.theme,
      },
      clientId: params.clientId,
    };
    const web3auth = new Web3Auth(options);

    if (params.newSession) {
      web3auth.clearCache();
    }

    this.subscribeAuthEvents(web3auth);

    await web3auth.initModal();

    const provider = await web3auth.connect();

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message: 'Failed to create a provider',
      });
    }

    return provider as Web3AuthProvider;
  }

  protected async createConnection(_options: EvmWeb3authConnectOptions): Promise<EvmConnection> {
    const params = { ...DEFAULT_OPTIONS, ..._options };

    this.logger.verbose('Connecting', { providedOptions: _options, params });

    const provider = await this.getProvider(params);

    const [chainId, accounts] = await Promise.all([
      provider?.request({ method: 'eth_chainId' }) as Promise<string>,
      provider?.request({ method: 'eth_accounts' }) as Promise<string[]>,
    ]);

    return {
      provider: provider,
      chain: new EvmChain(chainId),
      account: accounts[0] ? new EvmAddress(accounts[0]) : null,
    };
  }

  subscribeAuthEvents(web3auth: Web3Auth) {
    web3auth.on('MODAL_VISIBILITY', async (visibility: boolean) => {
      if (!visibility) {
        if (web3auth.status !== 'connected' && this.listnerCount === 0) {
          this.listnerCount++;
          this.logger.verbose('Modal closed, canceling connection request');
          web3auth.emit(ADAPTER_EVENTS.ERRORED, { name: 'Web3Auth', message: 'User closed login modal' });
          web3auth.loginModal.closeModal();
          web3auth.off('MODAL_VISIBILITY', () => {
            this.logger.verbose('Connection cancelled');
          });
        }
      }
    });
  }
}

const evmWeb3authConnector = new EvmWeb3authConnector({ core });
export default evmWeb3authConnector;
