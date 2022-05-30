import detectEthereumProvider from '@metamask/detect-provider';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import core, {
  EvmAddress,
  EvmChain,
  EvmChainish,
  EvmConnectResponse,
  EvmMetamaskConnectorConnectOptions,
  EvmProvider,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';

const DEFAULT_OPTIONS: EvmMetamaskConnectorConnectOptions = {
  silent: false,
  timeout: 30000,
};

export type MetamaskProvider = EvmProvider & { isMetaMask?: boolean; providers?: MetamaskProvider[] };
export class EvmMetamaskConnector extends EvmAbstractConnector {
  constructor() {
    super({
      name: 'metamask',
      core,
    });
  }

  private async getProvider(options?: EvmMetamaskConnectorConnectOptions): Promise<MetamaskProvider> {
    if (this._provider) {
      return this._provider as MetamaskProvider;
    }

    let provider: MetamaskProvider | null = (await detectEthereumProvider({
      silent: options?.silent,
      timeout: options?.timeout,
      mustBeMetaMask: true,
    })) as MetamaskProvider | null;

    // Provider can be a single provider or array of providers (for example when user has coinbasewallet and metamask installed)
    if (provider && provider.providers?.length) {
      provider = provider.providers.find((currentProvider) => currentProvider.isMetaMask) ?? null;
    }

    if (!provider) {
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.NO_PROVIDER,
        message:
          "No injected provider found at 'window.ethereum', make sure to have Metamask or any other injected wallet installed.",
      });
    }

    return provider;
  }

  async connect(_options?: Partial<EvmMetamaskConnectorConnectOptions>): Promise<EvmConnectResponse> {
    const options = { ...DEFAULT_OPTIONS, _options };
    this.logger.verbose('Connecting', { providedOptions: _options, options });
    const provider = await this.getProvider(options);
    this._provider = provider;

    const [accounts, chainId] = await Promise.all([
      provider.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      provider.request({ method: 'eth_chainId' }) as Promise<string>,
    ]);

    this.account = accounts[0] ? new EvmAddress(accounts[0]) : null;
    this.chain = new EvmChain(chainId);

    this.subscribeToEvents(provider);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { provider: this.provider!, chain: this.chain, account: this.account };
  }

  async switchNetwork(providedChain: EvmChainish) {
    const provider = await this.getProvider();

    const chain = EvmChain.create(providedChain);

    const currentNetwork = this.chain;
    if (currentNetwork && currentNetwork.equals(chain)) {
      return;
    }

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.hex }],
    });
  }

  async addNetwork(providedChain: EvmChainish) {
    const chain = EvmChain.create(providedChain);

    const provider = await this.getProvider();

    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chain.hex,
          chainName: chain.name,
          nativeCurrency: chain.currency
            ? {
                name: chain.currency.name,
                symbol: chain.currency.symbol,
                decimals: chain.currency.decimals,
              }
            : undefined,
          rpcUrls: chain.rpcUrls,
          blockExplorerUrls: [chain.explorer],
        },
      ],
    });
  }
}

const evmMetamaskConnector = new EvmMetamaskConnector();
export default evmMetamaskConnector;
