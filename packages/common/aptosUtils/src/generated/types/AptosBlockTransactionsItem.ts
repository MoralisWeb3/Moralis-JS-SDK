import { AptosPendingTransaction, AptosPendingTransactionJSON, AptosPendingTransactionInput } from '../types/AptosPendingTransaction';
import { AptosUserTransaction, AptosUserTransactionJSON, AptosUserTransactionInput } from '../types/AptosUserTransaction';
import { AptosGenesisTransaction, AptosGenesisTransactionJSON, AptosGenesisTransactionInput } from '../types/AptosGenesisTransaction';
import { AptosBlockMetadataTransaction, AptosBlockMetadataTransactionJSON, AptosBlockMetadataTransactionInput } from '../types/AptosBlockMetadataTransaction';
import { AptosStateCheckpointTransaction, AptosStateCheckpointTransactionJSON, AptosStateCheckpointTransactionInput } from '../types/AptosStateCheckpointTransaction';

// $ref: #/components/schemas/Block/properties/transactions/items
// typeName: Block_transactions_Item
// unionType: oneOf

export type AptosBlockTransactionsItemJSON = AptosPendingTransactionJSON | AptosUserTransactionJSON | AptosGenesisTransactionJSON | AptosBlockMetadataTransactionJSON | AptosStateCheckpointTransactionJSON;
export type AptosBlockTransactionsItemInput = AptosPendingTransactionInput | AptosUserTransactionInput | AptosGenesisTransactionInput | AptosBlockMetadataTransactionInput | AptosStateCheckpointTransactionInput;

export class AptosBlockTransactionsItem {
  public static create(input: AptosBlockTransactionsItemInput | AptosBlockTransactionsItem): AptosBlockTransactionsItem {
    if (input instanceof AptosBlockTransactionsItem) {
      return input;
    }
    if (AptosPendingTransaction.isInput(input)) {
      return new AptosBlockTransactionsItem(AptosPendingTransaction.create(input));
    }
    if (AptosUserTransaction.isInput(input)) {
      return new AptosBlockTransactionsItem(AptosUserTransaction.create(input));
    }
    if (AptosGenesisTransaction.isInput(input)) {
      return new AptosBlockTransactionsItem(AptosGenesisTransaction.create(input));
    }
    if (AptosBlockMetadataTransaction.isInput(input)) {
      return new AptosBlockTransactionsItem(AptosBlockMetadataTransaction.create(input));
    }
    if (AptosStateCheckpointTransaction.isInput(input)) {
      return new AptosBlockTransactionsItem(AptosStateCheckpointTransaction.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosBlockTransactionsItemJSON): AptosBlockTransactionsItem {
    if (AptosPendingTransaction.isJSON(json)) {
      return new AptosBlockTransactionsItem(AptosPendingTransaction.fromJSON(json));
    }
    if (AptosUserTransaction.isJSON(json)) {
      return new AptosBlockTransactionsItem(AptosUserTransaction.fromJSON(json));
    }
    if (AptosGenesisTransaction.isJSON(json)) {
      return new AptosBlockTransactionsItem(AptosGenesisTransaction.fromJSON(json));
    }
    if (AptosBlockMetadataTransaction.isJSON(json)) {
      return new AptosBlockTransactionsItem(AptosBlockMetadataTransaction.fromJSON(json));
    }
    if (AptosStateCheckpointTransaction.isJSON(json)) {
      return new AptosBlockTransactionsItem(AptosStateCheckpointTransaction.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosBlockTransactionsItem (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction) {}

  public toJSON(): AptosBlockTransactionsItemJSON {
    if (this.value instanceof AptosPendingTransaction) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosUserTransaction) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosGenesisTransaction) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosBlockMetadataTransaction) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosStateCheckpointTransaction) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
