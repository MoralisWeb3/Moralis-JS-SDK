import core, {
  EvmAddress,
  MoralisCore,
  EvmChain,
  EvmWeb3authConnectOptions,
  EvmProvider,
  EvmConnection,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { Web3Auth, Web3AuthOptions } from '@web3auth/web3auth';
import { SafeEventEmitterProvider } from '@web3auth/base';

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
  public constructor(config: EvmWeb3authConnectorConfig) {
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

    const web3Auth = new Web3Auth(options);

    if (params.newSession) {
      web3Auth.clearCache();
    }
    await web3Auth.initModal();

    return await new Promise((resolve, reject) => {
      web3Auth.on('MODAL_VISIBILITY', async (visibility: boolean) => {
        if (!visibility && web3Auth.status !== 'connected') {
          reject(
            new MoralisNetworkConnectorError({
              code: NetworkConnectorErrorCode.GENERIC_NETWORK_CONNECTOR_ERROR,
              message: 'Modal closed, canceling connection request',
            }),
          );
        }
      });

      web3Auth
        .connect()
        .then((provider) => resolve(provider as Web3AuthProvider))
        .catch(() => {
          // Web3Auth never throws an error.
        });
    });
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
      chain: EvmChain.create(chainId),
      account: accounts[0] ? EvmAddress.create(accounts[0]) : null,
    };
  }
}

const evmWeb3authConnector = new EvmWeb3authConnector({ core });
export default evmWeb3authConnector;
