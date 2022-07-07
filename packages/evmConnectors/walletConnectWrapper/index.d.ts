import { IWalletConnectProviderOptions, IConnector } from '@walletconnect/types';

export declare class WalletConnectProviderWrapper {
  constructor(opts: IWalletConnectProviderOptions);
  chainId: number;
  enable(): Promise<string[]>;
  disconnect(): Promise<void>;
  wc: IConnector;
}
