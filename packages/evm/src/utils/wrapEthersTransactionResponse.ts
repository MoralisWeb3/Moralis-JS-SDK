import {
  EvmChainish,
  EvmTransactionReceipt,
  EvmTransactionReceiptInput,
  EvmTransactionResponse,
  EvmTransactionResponseInput,
} from '@moralis/core';
import { ethers } from 'ethers';

const ethTxReceiptToMoralisTxReceipt = ({
  effectiveGasPrice,
  ...tx
}: ethers.providers.TransactionReceipt): EvmTransactionReceiptInput => ({
  ...tx,
  gasPrice: effectiveGasPrice,
});

const ethTxResponseToMoralisTxResponse = (
  { chainId, ...tx }: ethers.providers.TransactionResponse,
  chain: EvmChainish | null,
): EvmTransactionResponseInput => ({
  ...tx,
  // Manually overwrite chain, because EthersJs does not set it correctly
  chain: chain ?? chainId,
});

const waitForResponse = async (
  ethResult: ethers.providers.TransactionResponse,
  transaction: EvmTransactionResponse,
  confirmations?: number,
) => {
  const receipt = await ethResult.wait(confirmations);
  return new EvmTransactionReceipt(ethTxReceiptToMoralisTxReceipt(receipt), transaction);
};

export const wrapEthersTransactionResponse = (
  ethersTransactionResponse: ethers.providers.TransactionResponse,
  chainId: EvmChainish | null,
) =>
  EvmTransactionResponse.create(
    ethTxResponseToMoralisTxResponse(ethersTransactionResponse, chainId),
    async (transactionResponse, confirmations) =>
      waitForResponse(ethersTransactionResponse, transactionResponse, confirmations),
  );
