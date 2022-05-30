import {
  EvmAddress,
  EvmAddressish,
  EvmChain,
  EvmChainish,
  EvmNative,
  EvmNativeish,
  EvmTransactionInput,
  EvmTransactionResponse,
} from '@moralisweb3/core';
import { assertChain } from '../assert/assertChain';

export interface TransferNativeOptions {
  to: EvmAddressish;
  value: EvmNativeish;
  chain?: EvmChainish;
}

export const makeTransferNative =
  (sendTransaction: (data: EvmTransactionInput) => Promise<EvmTransactionResponse>, _chain: EvmChain | null) =>
  async (options: TransferNativeOptions) => {
    const to = EvmAddress.create(options.to);
    const value = EvmNative.create(options.value);
    // TODO: check if provided chain is same as current chain, otherwise throw error
    const chain = assertChain(_chain, 'Chain is not set on MoralisEvm. Make sure to be properly connected');

    const transaction = await sendTransaction({
      to: to.checksum,
      value: value.value,
      chain,
    });

    return transaction;
  };
