import { AptosPendingTransaction, AptosPendingTransactionJSON, AptosPendingTransactionInput } from '../types/AptosPendingTransaction';
import { AptosUserTransaction, AptosUserTransactionJSON, AptosUserTransactionInput } from '../types/AptosUserTransaction';
import { AptosGenesisTransaction, AptosGenesisTransactionJSON, AptosGenesisTransactionInput } from '../types/AptosGenesisTransaction';
import { AptosBlockMetadataTransaction, AptosBlockMetadataTransactionJSON, AptosBlockMetadataTransactionInput } from '../types/AptosBlockMetadataTransaction';
import { AptosStateCheckpointTransaction, AptosStateCheckpointTransactionJSON, AptosStateCheckpointTransactionInput } from '../types/AptosStateCheckpointTransaction';

// $ref: #/components/schemas/Block/properties/transactions/items
// typeName: Block_transactions_Item
// unionType: anyOf

export type AptosBlockTransactionsItemJSON = AptosPendingTransactionJSON | AptosUserTransactionJSON | AptosGenesisTransactionJSON | AptosBlockMetadataTransactionJSON | AptosStateCheckpointTransactionJSON;
export type AptosBlockTransactionsItemInput = AptosPendingTransactionInput | AptosUserTransactionInput | AptosGenesisTransactionInput | AptosBlockMetadataTransactionInput | AptosStateCheckpointTransactionInput;
export type AptosBlockTransactionsItemValue = AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction;

export abstract class AptosBlockTransactionsItem {
  public static create(input: AptosBlockTransactionsItemInput): AptosBlockTransactionsItemValue {
    if (AptosPendingTransaction.isInput(input)) {
      return AptosPendingTransaction.create(input);
    }
    if (AptosUserTransaction.isInput(input)) {
      return AptosUserTransaction.create(input);
    }
    if (AptosGenesisTransaction.isInput(input)) {
      return AptosGenesisTransaction.create(input);
    }
    if (AptosBlockMetadataTransaction.isInput(input)) {
      return AptosBlockMetadataTransaction.create(input);
    }
    if (AptosStateCheckpointTransaction.isInput(input)) {
      return AptosStateCheckpointTransaction.create(input);
    }
    throw new Error('Cannot resolve union from AptosBlockTransactionsItemInput');
  }

  public static fromJSON(json: AptosBlockTransactionsItemJSON): AptosBlockTransactionsItemValue {
    if (AptosPendingTransaction.isJSON(json)) {
      return AptosPendingTransaction.fromJSON(json);
    }
    if (AptosUserTransaction.isJSON(json)) {
      return AptosUserTransaction.fromJSON(json);
    }
    if (AptosGenesisTransaction.isJSON(json)) {
      return AptosGenesisTransaction.fromJSON(json);
    }
    if (AptosBlockMetadataTransaction.isJSON(json)) {
      return AptosBlockMetadataTransaction.fromJSON(json);
    }
    if (AptosStateCheckpointTransaction.isJSON(json)) {
      return AptosStateCheckpointTransaction.fromJSON(json);
    }
    const keys = Object.keys(json).join(', ');
    const type = (json as any).type;
    throw new Error(`Cannot resolve union from AptosBlockTransactionsItemJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosBlockTransactionsItemValue): AptosBlockTransactionsItemJSON {
    if (value instanceof AptosPendingTransaction) {
      return value.toJSON();
    }
    if (value instanceof AptosUserTransaction) {
      return value.toJSON();
    }
    if (value instanceof AptosGenesisTransaction) {
      return value.toJSON();
    }
    if (value instanceof AptosBlockMetadataTransaction) {
      return value.toJSON();
    }
    if (value instanceof AptosStateCheckpointTransaction) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosBlockTransactionsItemValue');
  }
}
