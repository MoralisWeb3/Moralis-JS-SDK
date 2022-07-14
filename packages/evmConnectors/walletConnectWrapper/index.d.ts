import { IWalletConnectProviderOptions, IConnector } from '@walletconnect/types';

export declare class WalletConnectProviderWrapper {
  constructor(opts: IWalletConnectProviderOptions);
  chainId: number;
  enable(): Promise<string[]>;
  disconnect(): Promise<void>;
  wc: IConnector;
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>;
  on(event: string, listener: (args: never) => void): void;
  once(event: string, listener: (args: unknown) => void): void;
  removeListener(event: string, listener: (args: unknown) => void): void;
  off(event: string, listener: (args: unknown) => void): void;
}
