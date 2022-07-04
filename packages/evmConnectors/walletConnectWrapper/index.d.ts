import { IWalletConnectProviderOptions } from '@walletconnect/types';

export declare class WalletConnectProviderWrapper {
  constructor(opts: IWalletConnectProviderOptions);
  chainId: number;
  enable(): Promise<string[]>;
}
