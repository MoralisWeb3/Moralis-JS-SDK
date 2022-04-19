import detectEthereumProvider from '@metamask/detect-provider';
import { EvmAbstractConnector } from '@moralis/evm-connector-utils';
import {
  EvmAddress,
  EvmChain,
  EvmChainish,
  EvmConnectResponse,
  EvmMetamaskConnectorConnectOptions,
  EvmProvider,
  Logger,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralis/core';
import core from '@moralis/core';

const defaultOptions: EvmMetamaskConnectorConnectOptions = {
  silent: false,
  timeout: 30000,
};

// TODO: general way of naming
const logger = new Logger(core, 'evmConnector:metamask');

export type MetamaskProvider = EvmProvider & { isMetaMask?: boolean; providers?: MetamaskProvider[] };
export class EvmMetamaskConnector extends EvmAbstractConnector {
  static id = 'metamask';
  static network = 'evm';

  private async getProvider(options?: EvmMetamaskConnectorConnectOptions) {
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

  // TODO: add eagerconnect (and move setting the provider to an "init" function)
  async connect(_options?: Partial<EvmMetamaskConnectorConnectOptions>): Promise<EvmConnectResponse> {
    const options = { ...defaultOptions, _options };
    logger.verbose('Connecting', { providedOptions: _options, options });
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

  // TODO: refactor to use this as static function?
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

  // TODO: refactor to use this as static function?
  async addNetwork(providedChain: EvmChainish) {
    const chain = EvmChain.create(providedChain);

    const provider = await this.getProvider();

    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chain.hex,
          chainName: chain.name,
          nativeCurrency: {
            name: chain.currency.name,
            symbol: chain.currency.symbol,
            decimals: chain.currency.decimals,
          },
          rpcUrls: chain.rpcUrls,
          blockExplorerUrls: chain.blockExplorers,
        },
      ],
    });
  }
}
