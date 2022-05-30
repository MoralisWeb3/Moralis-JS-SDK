import { EvmBaseConnectOptions } from '@moralisweb3/core';
import { Wallets } from './Wallets';

export const connectWallet = async <Options extends EvmBaseConnectOptions>(
  wallets: Wallets,
  walletName: string,
  options: Options,
) => {
  const wallet = wallets.get(walletName);
  const data = await wallet.connect(options);

  return { ...data, wallet };
};
