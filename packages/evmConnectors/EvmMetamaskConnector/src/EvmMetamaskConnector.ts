import detectEthereumProvider from '@metamask/detect-provider';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import {
  EvmAddress,
  EvmChain,
  EvmChainish,
  EvmConnection,
  EvmMetamaskConnectorConnectOptions,
  EvmProvider,
  MoralisCore,
  MoralisCoreProvider,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';

const DEFAULT_OPTIONS: EvmMetamaskConnectorConnectOptions = {
  silent: false,
  timeout: 30000,
};

export type MetamaskProvider = EvmProvider & { isMetaMask?: boolean; providers?: MetamaskProvider[] };

export class EvmMetamaskConnector extends EvmAbstractConnector<MetamaskProvider, EvmMetamaskConnectorConnectOptions> {
  public static create(core?: MoralisCore): EvmMetamaskConnector {
    return new EvmMetamaskConnector(core || MoralisCoreProvider.getDefault());
  }

  public constructor(core: MoralisCore) {
    super('metamask', core);
  }

  protected async createProvider(options?: EvmMetamaskConnectorConnectOptions): Promise<MetamaskProvider> {
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

  protected async createConnection(options?: EvmMetamaskConnectorConnectOptions): Promise<EvmConnection> {
    const finalOptions = { ...DEFAULT_OPTIONS, options };
    this.logger.verbose('Connecting', { providedOptions: options, options: finalOptions });
    const provider = await this.getProvider(finalOptions);

    const [accounts, chainId] = await Promise.all([
      provider.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      provider.request({ method: 'eth_chainId' }) as Promise<string>,
    ]);

    return {
      provider,
      chain: EvmChain.create(chainId),
      account: accounts[0] ? EvmAddress.create(accounts[0]) : null,
    };
  }

  public async switchNetwork(providedChain: EvmChainish): Promise<void> {
    const chain = EvmChain.create(providedChain);

    const provider = await this.getProvider();

    const currentNetwork = this.chain;
    if (currentNetwork && currentNetwork.equals(chain)) {
      return;
    }

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.hex }],
    });
  }

  public async addNetwork(providedChain: EvmChainish): Promise<void> {
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
          // TODO: validate rpcUrls
          rpcUrls: chain.rpcUrls,
          blockExplorerUrls: chain.explorer?.url ? [chain.explorer.url] : null,
        },
      ],
    });
  }
}
