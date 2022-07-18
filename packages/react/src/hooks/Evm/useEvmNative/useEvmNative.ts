import { EvmTransactionReceipt, EvmTransactionResponse, MoralisError } from '@moralisweb3/core';
import { IDefaultCallbacks } from '../../types';
import { TransferNativeOptions } from '@moralisweb3/evm/lib/chainMethods/transferNative';
import { useResolver } from '../../useResolver';
import { useState, useCallback } from 'react';
import Evm from '@moralisweb3/evm';

export const useEvmNative = (transferOptions: TransferNativeOptions) => {
  const resolver = useResolver();
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState<EvmTransactionResponse | null>(null);
  const [receipt, setReceipt] = useState<EvmTransactionReceipt | null>(null);
  const [error, setError] = useState<MoralisError | null>(null);

  const transfer = useCallback(
    ({ onComplete, onError, onSuccess, throwOnError = false }: IDefaultCallbacks<EvmTransactionResponse> = {}) => {
      return resolver(
        () => {
          setIsLoading(true);
          return Evm.transferNative(transferOptions);
        },
        {
          _onComplete: () => setIsLoading(false),
          _onError: setError,
          _onSuccess: async (tx) => {
            setTransaction(tx);
            const txReceipt = await tx.wait();
            setReceipt(txReceipt);
          },
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );

  return { transfer, isLoading, transaction, error, receipt };
};
