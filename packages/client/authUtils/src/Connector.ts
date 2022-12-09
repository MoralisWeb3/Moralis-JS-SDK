export interface ConnectorResolver<WalletProvider> {
  resolve(name: string): Connector<WalletProvider>;
}

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

export interface WalletDetails {
  address: string;
  chain?: string;
  network?: string;
}
