import { EvmChain, EvmTransactionInput, EvmTransaction } from '@moralisweb3/core';
import { ethers } from 'ethers';
import { assertChain } from '../assert/assertChain';
import { assertProvider } from '../assert/assertProvider';
import { wrapEthersTransactionResponse } from '../utils/wrapEthersTransactionResponse';

export const makeSendTransaction =
  (_provider: ethers.providers.JsonRpcSigner | null, _chain: EvmChain | null) => async (data: EvmTransactionInput) => {
    const provider = assertProvider(_provider);
    const chain = assertChain(
      data.chain ?? _chain,
      'Chain is not set on MoralisEvm. Make sure to be properly connected',
    );

    data.chain = chain;

    const transaction = EvmTransaction.create(data, async (tx) => {
      const ethTransactionResponse = await provider.sendTransaction(tx.toEthRequest());

      return wrapEthersTransactionResponse(ethTransactionResponse, chain);
    });

    return transaction.send();
  };
