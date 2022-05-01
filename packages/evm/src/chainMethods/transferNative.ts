import {
  EvmAddress,
  EvmAddressish,
  EvmChainish,
  EvmNative,
  EvmNativeish,
  EvmTransactionInput,
  EvmTransactionResponse,
} from '@moralis/core/lib';

export interface TransferNativeOptions {
  to: EvmAddressish;
  value: EvmNativeish;
  chain?: EvmChainish;
}

export const makeTransferNative =
  (sendTransaction: (data: EvmTransactionInput) => Promise<EvmTransactionResponse>) =>
  async (options: TransferNativeOptions) => {
    const to = EvmAddress.create(options.to);
    const value = EvmNative.create(options.value);

    const transaction = await sendTransaction({
      to: to.checksum,
      value: value.bignumber,
      chain: options.chain,
    });

    return transaction;
  };
