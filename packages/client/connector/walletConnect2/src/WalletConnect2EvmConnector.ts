import { Web3Provider } from '@ethersproject/providers';
import { WalletDetails } from '@moralisweb3/client-auth-utils';
import { EvmConnection, EvmConnector } from '@moralisweb3/client-evm-auth';
import * as encoding from '@walletconnect/encoding';
import UniversalProvider from '@walletconnect/universal-provider';
import { Web3Modal } from '@web3modal/standalone';

export const DEFAULT_RELAY_URL = 'wss://relay.walletconnect.com';
const ETHEREUM_MAINNET = 'eip155:1';

export interface WalletConnect2EvmConnectorOptions {
  appMetadata: {
    name: string;
    description: string;
    url: string;
    icons: string[];
  };
  ethereumRpc: string;
  projectId: string;
  relayUrl?: string;
}

export class WalletConnect2EvmConnector implements EvmConnector {
  public static create(options: WalletConnect2EvmConnectorOptions): WalletConnect2EvmConnector {
    return new WalletConnect2EvmConnector(options);
  }

  public readonly name = 'walletConnect2';
  private readonly options: WalletConnect2EvmConnectorOptions;

  public constructor(options: WalletConnect2EvmConnectorOptions) {
    this.options = {
      relayUrl: DEFAULT_RELAY_URL,
      ...options,
    };
  }

  public async connect(): Promise<EvmConnection> {
    const web3Modal = new Web3Modal({
      projectId: this.options.projectId,
      standaloneChains: [ETHEREUM_MAINNET],
    });

    const universalProvider = await UniversalProvider.init({
      projectId: this.options.projectId,
      relayUrl: this.options.relayUrl,
      metadata: this.options.appMetadata,
    });
    universalProvider.on('display_uri', (uri: string) => {
      web3Modal.openModal({ uri });
    });

    await universalProvider.connect({
      namespaces: {
        eip155: {
          methods: [
            'eth_accounts',
            'eth_chainId',
            'eth_getBalance',
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: [ETHEREUM_MAINNET],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: {
            1: this.options.ethereumRpc,
          },
        },
      },
      // pairingTopic: ...,
    });
    universalProvider.setDefaultChain(ETHEREUM_MAINNET);
    await universalProvider.enable();
    web3Modal.closeModal();

    return new WalletConnect2EvmConnection(this.name, universalProvider);
  }
}

class WalletConnect2EvmConnection implements EvmConnection {
  public readonly connectorName: string;
  public readonly universalProvider: UniversalProvider;
  public readonly provider: Web3Provider;
  public onClientDisconnect?: () => void;

  public constructor(connectorName: string, universalProvider: UniversalProvider) {
    this.connectorName = connectorName;
    this.universalProvider = universalProvider;
    this.provider = new Web3Provider(universalProvider);

    this.universalProvider.on('session_delete', async () => {
      localStorage.removeItem(this.connectorName);
      this.onClientDisconnect?.();
    });
  }

  public async readWallet(): Promise<WalletDetails> {
    const [accounts, chain] = await Promise.all([
      this.universalProvider.request<string[]>({ method: 'eth_accounts', params: [] }, ETHEREUM_MAINNET),
      this.universalProvider.request<{ chainId: string }>({ method: 'eth_chainId', params: [] }, ETHEREUM_MAINNET),
    ]);
    return {
      address: accounts[0],
      evmChain: String(chain.chainId),
    };
  }

  public async signMessage(message: string): Promise<string> {
    const address = this.universalProvider.session.namespaces.eip155.accounts[0].split(':').pop();
    const hexMsg = encoding.utf8ToHex(message, true);
    const params = [hexMsg, address];

    return this.universalProvider.request<string>({ method: 'personal_sign', params }, ETHEREUM_MAINNET);
  }

  public async disconnect(): Promise<void> {
    localStorage.removeItem(this.connectorName);
    try {
      await this.universalProvider.disconnect();
    } catch (e) {
      const regex = /No\s*matching\s*key/i;
      if (!regex.test(e.message)) {
        throw e;
      }
    }
  }
}
