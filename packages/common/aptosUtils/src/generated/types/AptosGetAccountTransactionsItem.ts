import { AptosPendingTransaction, AptosPendingTransactionJSON, AptosPendingTransactionInput } from '../types/AptosPendingTransaction';
import { AptosUserTransaction, AptosUserTransactionJSON, AptosUserTransactionInput } from '../types/AptosUserTransaction';
import { AptosGenesisTransaction, AptosGenesisTransactionJSON, AptosGenesisTransactionInput } from '../types/AptosGenesisTransaction';
import { AptosBlockMetadataTransaction, AptosBlockMetadataTransactionJSON, AptosBlockMetadataTransactionInput } from '../types/AptosBlockMetadataTransaction';
import { AptosStateCheckpointTransaction, AptosStateCheckpointTransactionJSON, AptosStateCheckpointTransactionInput } from '../types/AptosStateCheckpointTransaction';

// $ref: #/paths/~1accounts~1{address}~1transactions/get/responses/200/content/application~1json/schema/items
// typeName: getAccountTransactions_Item
// unionType: oneOf

export type AptosGetAccountTransactionsItemJSON = AptosPendingTransactionJSON | AptosUserTransactionJSON | AptosGenesisTransactionJSON | AptosBlockMetadataTransactionJSON | AptosStateCheckpointTransactionJSON;
export type AptosGetAccountTransactionsItemInput = AptosPendingTransactionInput | AptosUserTransactionInput | AptosGenesisTransactionInput | AptosBlockMetadataTransactionInput | AptosStateCheckpointTransactionInput;

export class AptosGetAccountTransactionsItem {
  public static create(input: AptosGetAccountTransactionsItemInput | AptosGetAccountTransactionsItem): AptosGetAccountTransactionsItem {
    if (input instanceof AptosGetAccountTransactionsItem) {
      return input;
    }
    if (AptosPendingTransaction.isInput(input)) {
      return new AptosGetAccountTransactionsItem(AptosPendingTransaction.create(input));
    }
    if (AptosUserTransaction.isInput(input)) {
      return new AptosGetAccountTransactionsItem(AptosUserTransaction.create(input));
    }
    if (AptosGenesisTransaction.isInput(input)) {
      return new AptosGetAccountTransactionsItem(AptosGenesisTransaction.create(input));
    }
    if (AptosBlockMetadataTransaction.isInput(input)) {
      return new AptosGetAccountTransactionsItem(AptosBlockMetadataTransaction.create(input));
    }
    if (AptosStateCheckpointTransaction.isInput(input)) {
      return new AptosGetAccountTransactionsItem(AptosStateCheckpointTransaction.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosGetAccountTransactionsItemJSON): AptosGetAccountTransactionsItem {
    if (AptosPendingTransaction.isJSON(json)) {
      return new AptosGetAccountTransactionsItem(AptosPendingTransaction.fromJSON(json));
    }
    if (AptosUserTransaction.isJSON(json)) {
      return new AptosGetAccountTransactionsItem(AptosUserTransaction.fromJSON(json));
    }
    if (AptosGenesisTransaction.isJSON(json)) {
      return new AptosGetAccountTransactionsItem(AptosGenesisTransaction.fromJSON(json));
    }
    if (AptosBlockMetadataTransaction.isJSON(json)) {
      return new AptosGetAccountTransactionsItem(AptosBlockMetadataTransaction.fromJSON(json));
    }
    if (AptosStateCheckpointTransaction.isJSON(json)) {
      return new AptosGetAccountTransactionsItem(AptosStateCheckpointTransaction.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosGetAccountTransactionsItem (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction) {}

  public toJSON(): AptosGetAccountTransactionsItemJSON {
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
