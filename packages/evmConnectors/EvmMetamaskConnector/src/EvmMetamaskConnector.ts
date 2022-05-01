import detectEthereumProvider from '@metamask/detect-provider';
import { EvmAbstractConnector } from '@moralis/evm-connector-utils';
import core, {
  EvmAddress,
  EvmChain,
  EvmChainish,
  EvmConnectResponse,
  EvmMetamaskConnectorConnectOptions,
  EvmProvider,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralis/core';

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

    // TODO: initialize provider if possible
    // TODO add subscriptions
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
      console.log('found MM provider(s)', provider);
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
      // TODO: accept EvmChainish
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

  async watchToken() {
    // const wasAdded = await ethereum.request({
    //   method: 'wallet_watchAsset',
    //   params: {
    //     type: 'ERC20', // Initially only supports ERC20, but eventually more!
    //     options: {
    //       address: tokenAddress, // The address that the token is at.
    //       symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
    //       decimals: tokenDecimals, // The number of decimals in the token
    //       image: tokenImage, // A string url of the token logo
    //     },
    //   },
    // });
    // if (wasAdded) {
    //   console.log('Thanks for your interest!');
    // } else {
    //   console.log('Your loss!');
    // }
  }
}

const evmMetamaskConnector = new EvmMetamaskConnector();
export default evmMetamaskConnector;
