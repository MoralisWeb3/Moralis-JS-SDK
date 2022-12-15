export interface Connector<WalletProvider> {
  name: string;
  connect(): Promise<Connection<WalletProvider>>;
}

export interface Connection<WalletProvider> {
  connectorName: string;
  provider: WalletProvider;
  readWallet(): Promise<WalletDetails>;
  signMessage(message: string): Promise<string>;
  disconnect(): Promise<void>;
}

/**
 * @description Connected wallet details.
 */
export interface WalletDetails {
  /**
   * @description Address of a user's wallet.
   */
  address: string;

  /**
   * @description Chain of an connected EVM wallet.
   * @example "0x1"
   */
  evmChain?: string;

  /**
   * @description Network of an connected Solana wallet.
   * @example "mainnet"
   */
  solNetwork?: string;
}
