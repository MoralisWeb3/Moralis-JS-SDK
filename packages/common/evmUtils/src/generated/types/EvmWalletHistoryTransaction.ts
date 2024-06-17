import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmInternalTransaction, EvmInternalTransactionInput, EvmInternalTransactionJSON } from '../../dataTypes';
import { BigNumber, BigNumberInput, BigNumberJSON } from '@moralisweb3/common-core';
import { EvmETransactionCategory, EvmETransactionCategoryValue, EvmETransactionCategoryInput, EvmETransactionCategoryJSON } from '../types/EvmETransactionCategory';
import { EvmWalletHistoryNftTransfer, EvmWalletHistoryNftTransferInput, EvmWalletHistoryNftTransferJSON } from '../types/EvmWalletHistoryNftTransfer';
import { EvmWalletHistoryErc20Transfer, EvmWalletHistoryErc20TransferInput, EvmWalletHistoryErc20TransferJSON } from '../types/EvmWalletHistoryErc20Transfer';
import { EvmNativeTransfer, EvmNativeTransferInput, EvmNativeTransferJSON } from '../types/EvmNativeTransfer';
import { EvmLog, EvmLogInput, EvmLogJSON } from '../types/EvmLog';

// $ref: #/components/schemas/walletHistoryTransaction
// type: walletHistoryTransaction
// properties:
// - hash ($ref: #/components/schemas/walletHistoryTransaction/properties/hash)
// - nonce ($ref: #/components/schemas/walletHistoryTransaction/properties/nonce)
// - transaction_index ($ref: #/components/schemas/walletHistoryTransaction/properties/transaction_index)
// - from_address ($ref: #/components/schemas/walletHistoryTransaction/properties/from_address)
// - from_address_label ($ref: #/components/schemas/walletHistoryTransaction/properties/from_address_label)
// - to_address ($ref: #/components/schemas/walletHistoryTransaction/properties/to_address)
// - to_address_label ($ref: #/components/schemas/walletHistoryTransaction/properties/to_address_label)
// - value ($ref: #/components/schemas/walletHistoryTransaction/properties/value)
// - gas ($ref: #/components/schemas/walletHistoryTransaction/properties/gas)
// - gas_price ($ref: #/components/schemas/walletHistoryTransaction/properties/gas_price)
// - input ($ref: #/components/schemas/walletHistoryTransaction/properties/input)
// - receipt_cumulative_gas_used ($ref: #/components/schemas/walletHistoryTransaction/properties/receipt_cumulative_gas_used)
// - receipt_gas_used ($ref: #/components/schemas/walletHistoryTransaction/properties/receipt_gas_used)
// - receipt_status ($ref: #/components/schemas/walletHistoryTransaction/properties/receipt_status)
// - transaction_fee ($ref: #/components/schemas/walletHistoryTransaction/properties/transaction_fee)
// - block_timestamp ($ref: #/components/schemas/walletHistoryTransaction/properties/block_timestamp)
// - block_number ($ref: #/components/schemas/walletHistoryTransaction/properties/block_number)
// - block_hash ($ref: #/components/schemas/walletHistoryTransaction/properties/block_hash)
// - internal_transactions ($ref: #/components/schemas/internalTransaction)
// - category ($ref: #/components/schemas/ETransactionCategory)
// - possible_spam ($ref: #/components/schemas/walletHistoryTransaction/properties/possible_spam)
// - method_label ($ref: #/components/schemas/walletHistoryTransaction/properties/method_label)
// - summary ($ref: #/components/schemas/walletHistoryTransaction/properties/summary)
// - nft_transfers ($ref: #/components/schemas/walletHistoryNftTransfer)
// - erc20_transfers ($ref: #/components/schemas/walletHistoryErc20Transfer)
// - native_transfers ($ref: #/components/schemas/native_transfer)
// - logs ($ref: #/components/schemas/log)

export interface EvmWalletHistoryTransactionJSON {
  readonly hash: string;
  readonly nonce: string;
  readonly transaction_index: string;
  readonly from_address: EvmAddressJSON;
  readonly from_address_label?: string;
  readonly to_address?: EvmAddressJSON;
  readonly to_address_label?: string;
  readonly value: string;
  readonly gas?: string;
  readonly gas_price: string;
  readonly input?: string;
  readonly receipt_cumulative_gas_used: string;
  readonly receipt_gas_used: string;
  readonly receipt_status: string;
  readonly transaction_fee?: string;
  readonly block_timestamp: string;
  readonly block_number: BigNumberJSON;
  readonly block_hash: string;
  readonly internal_transactions?: EvmInternalTransactionJSON[];
  readonly category: EvmETransactionCategoryJSON;
  readonly possible_spam?: boolean;
  readonly method_label?: string;
  readonly summary: string;
  readonly nft_transfers: EvmWalletHistoryNftTransferJSON[];
  readonly erc20_transfers: EvmWalletHistoryErc20TransferJSON[];
  readonly native_transfers: EvmNativeTransferJSON[];
  readonly logs?: EvmLogJSON[];
}

export interface EvmWalletHistoryTransactionInput {
  readonly hash: string;
  readonly nonce: string;
  readonly transactionIndex: number;
  readonly fromAddress: EvmAddressInput | EvmAddress;
  readonly fromAddressLabel?: string;
  readonly toAddress?: EvmAddressInput | EvmAddress;
  readonly toAddressLabel?: string;
  readonly value: string;
  readonly gas?: string;
  readonly gasPrice: string;
  readonly input?: string;
  readonly receiptCumulativeGasUsed: string;
  readonly receiptGasUsed: string;
  readonly receiptStatus: string;
  readonly transactionFee?: string;
  readonly blockTimestamp: string;
  readonly blockNumber: BigNumberInput | BigNumber;
  readonly blockHash: string;
  readonly internalTransactions?: EvmInternalTransactionInput[] | EvmInternalTransaction[];
  readonly category: EvmETransactionCategoryInput | EvmETransactionCategoryValue;
  readonly possibleSpam?: boolean;
  readonly methodLabel?: string;
  readonly summary: string;
  readonly nftTransfers: EvmWalletHistoryNftTransferInput[] | EvmWalletHistoryNftTransfer[];
  readonly erc20Transfers: EvmWalletHistoryErc20TransferInput[] | EvmWalletHistoryErc20Transfer[];
  readonly nativeTransfers: EvmNativeTransferInput[] | EvmNativeTransfer[];
  readonly logs?: EvmLogInput[] | EvmLog[];
}

export class EvmWalletHistoryTransaction {
  public static create(input: EvmWalletHistoryTransactionInput | EvmWalletHistoryTransaction): EvmWalletHistoryTransaction {
    if (input instanceof EvmWalletHistoryTransaction) {
      return input;
    }
    return new EvmWalletHistoryTransaction(input);
  }

  public static fromJSON(json: EvmWalletHistoryTransactionJSON): EvmWalletHistoryTransaction {
    const input: EvmWalletHistoryTransactionInput = {
      hash: json.hash,
      nonce: json.nonce,
      transactionIndex: Number(json.transaction_index),
      fromAddress: EvmAddress.fromJSON(json.from_address),
      fromAddressLabel: json.from_address_label,
      toAddress: json.to_address ? EvmAddress.fromJSON(json.to_address) : undefined,
      toAddressLabel: json.to_address_label,
      value: json.value,
      gas: json.gas,
      gasPrice: json.gas_price,
      input: json.input,
      receiptCumulativeGasUsed: json.receipt_cumulative_gas_used,
      receiptGasUsed: json.receipt_gas_used,
      receiptStatus: json.receipt_status,
      transactionFee: json.transaction_fee,
      blockTimestamp: json.block_timestamp,
      blockNumber: BigNumber.fromJSON(json.block_number),
      blockHash: json.block_hash,
      internalTransactions: json.internal_transactions ? json.internal_transactions.map((item) => EvmInternalTransaction.fromJSON(item)) : undefined,
      category: EvmETransactionCategory.fromJSON(json.category),
      possibleSpam: json.possible_spam,
      methodLabel: json.method_label,
      summary: json.summary,
      nftTransfers: json.nft_transfers.map((item) => EvmWalletHistoryNftTransfer.fromJSON(item)),
      erc20Transfers: json.erc20_transfers.map((item) => EvmWalletHistoryErc20Transfer.fromJSON(item)),
      nativeTransfers: json.native_transfers.map((item) => EvmNativeTransfer.fromJSON(item)),
      logs: json.logs ? json.logs.map((item) => EvmLog.fromJSON(item)) : undefined,
    };
    return EvmWalletHistoryTransaction.create(input);
  }

  /**
   * @description The hash of the transaction
   */
  public readonly hash: string;
  /**
   * @description The nonce
   */
  public readonly nonce: string;
  public readonly transactionIndex: number;
  /**
   * @description The from address
   */
  public readonly fromAddress: EvmAddress;
  /**
   * @description The label of the from address
   */
  public readonly fromAddressLabel?: string;
  /**
   * @description The to address
   */
  public readonly toAddress?: EvmAddress;
  /**
   * @description The label of the to address
   */
  public readonly toAddressLabel?: string;
  /**
   * @description The value sent
   */
  public readonly value: string;
  public readonly gas?: string;
  /**
   * @description The gas price
   */
  public readonly gasPrice: string;
  public readonly input?: string;
  public readonly receiptCumulativeGasUsed: string;
  public readonly receiptGasUsed: string;
  public readonly receiptStatus: string;
  public readonly transactionFee?: string;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The block number
   */
  public readonly blockNumber: BigNumber;
  /**
   * @description The hash of the block
   */
  public readonly blockHash: string;
  /**
   * @description The internal transactions of the transaction
   */
  public readonly internalTransactions?: EvmInternalTransaction[];
  public readonly category: EvmETransactionCategoryValue;
  /**
   * @description Is transaction possible spam
   */
  public readonly possibleSpam?: boolean;
  /**
   * @description The label of the method called if any called
   */
  public readonly methodLabel?: string;
  /**
   * @description Summary of what happened on the transaction
   */
  public readonly summary: string;
  public readonly nftTransfers: EvmWalletHistoryNftTransfer[];
  public readonly erc20Transfers: EvmWalletHistoryErc20Transfer[];
  public readonly nativeTransfers: EvmNativeTransfer[];
  public readonly logs?: EvmLog[];

  private constructor(input: EvmWalletHistoryTransactionInput) {
    this.hash = input.hash;
    this.nonce = input.nonce;
    this.transactionIndex = input.transactionIndex;
    this.fromAddress = EvmAddress.create(input.fromAddress);
    this.fromAddressLabel = input.fromAddressLabel;
    this.toAddress = input.toAddress ? EvmAddress.create(input.toAddress) : undefined;
    this.toAddressLabel = input.toAddressLabel;
    this.value = input.value;
    this.gas = input.gas;
    this.gasPrice = input.gasPrice;
    this.input = input.input;
    this.receiptCumulativeGasUsed = input.receiptCumulativeGasUsed;
    this.receiptGasUsed = input.receiptGasUsed;
    this.receiptStatus = input.receiptStatus;
    this.transactionFee = input.transactionFee;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = BigNumber.create(input.blockNumber);
    this.blockHash = input.blockHash;
    this.internalTransactions = input.internalTransactions ? input.internalTransactions.map((item) => EvmInternalTransaction.create(item)) : undefined;
    this.category = EvmETransactionCategory.create(input.category);
    this.possibleSpam = input.possibleSpam;
    this.methodLabel = input.methodLabel;
    this.summary = input.summary;
    this.nftTransfers = input.nftTransfers.map((item) => EvmWalletHistoryNftTransfer.create(item));
    this.erc20Transfers = input.erc20Transfers.map((item) => EvmWalletHistoryErc20Transfer.create(item));
    this.nativeTransfers = input.nativeTransfers.map((item) => EvmNativeTransfer.create(item));
    this.logs = input.logs ? input.logs.map((item) => EvmLog.create(item)) : undefined;
  }

  public toJSON(): EvmWalletHistoryTransactionJSON {
    return {
      hash: this.hash,
      nonce: this.nonce,
      transaction_index: String(this.transactionIndex),
      from_address: this.fromAddress.toJSON(),
      from_address_label: this.fromAddressLabel,
      to_address: this.toAddress ? this.toAddress.toJSON() : undefined,
      to_address_label: this.toAddressLabel,
      value: this.value,
      gas: this.gas,
      gas_price: this.gasPrice,
      input: this.input,
      receipt_cumulative_gas_used: this.receiptCumulativeGasUsed,
      receipt_gas_used: this.receiptGasUsed,
      receipt_status: this.receiptStatus,
      transaction_fee: this.transactionFee,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber.toJSON(),
      block_hash: this.blockHash,
      internal_transactions: this.internalTransactions ? this.internalTransactions.map((item) => item.toJSON()) : undefined,
      category: this.category,
      possible_spam: this.possibleSpam,
      method_label: this.methodLabel,
      summary: this.summary,
      nft_transfers: this.nftTransfers.map((item) => item.toJSON()),
      erc20_transfers: this.erc20Transfers.map((item) => item.toJSON()),
      native_transfers: this.nativeTransfers.map((item) => item.toJSON()),
      logs: this.logs ? this.logs.map((item) => item.toJSON()) : undefined,
    }
  }
}
