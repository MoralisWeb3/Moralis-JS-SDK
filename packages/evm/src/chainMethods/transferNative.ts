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
import { validateChain } from '../utils/validators';

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
    const chain = assertChain(_chain, 'Chain is not set on MoralisEvm. Make sure to be properly connected');
    if (options.chain) validateChain(options.chain, chain);

    const transaction = await sendTransaction({
      to: to.checksum,
      value: value.value,
      chain,
    });

    return transaction;
  };
