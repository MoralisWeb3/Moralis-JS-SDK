import { AptosPendingTransaction, AptosPendingTransactionJSON, AptosPendingTransactionInput } from '../types/AptosPendingTransaction';
import { AptosUserTransaction, AptosUserTransactionJSON, AptosUserTransactionInput } from '../types/AptosUserTransaction';
import { AptosGenesisTransaction, AptosGenesisTransactionJSON, AptosGenesisTransactionInput } from '../types/AptosGenesisTransaction';
import { AptosBlockMetadataTransaction, AptosBlockMetadataTransactionJSON, AptosBlockMetadataTransactionInput } from '../types/AptosBlockMetadataTransaction';
import { AptosStateCheckpointTransaction, AptosStateCheckpointTransactionJSON, AptosStateCheckpointTransactionInput } from '../types/AptosStateCheckpointTransaction';

// $ref: #/paths/~1transactions~1simulate/post/responses/200/content/application~1json/schema
// typeName: simulateTransaction
// unionType: oneOf

export type AptosSimulateTransactionJSON = AptosPendingTransactionJSON | AptosUserTransactionJSON | AptosGenesisTransactionJSON | AptosBlockMetadataTransactionJSON | AptosStateCheckpointTransactionJSON;
export type AptosSimulateTransactionInput = AptosPendingTransactionInput | AptosUserTransactionInput | AptosGenesisTransactionInput | AptosBlockMetadataTransactionInput | AptosStateCheckpointTransactionInput;

export class AptosSimulateTransaction {
  public static create(input: AptosSimulateTransactionInput | AptosSimulateTransaction): AptosSimulateTransaction {
    if (input instanceof AptosSimulateTransaction) {
      return input;
    }
    if (AptosPendingTransaction.isInput(input)) {
      return new AptosSimulateTransaction(AptosPendingTransaction.create(input));
    }
    if (AptosUserTransaction.isInput(input)) {
      return new AptosSimulateTransaction(AptosUserTransaction.create(input));
    }
    if (AptosGenesisTransaction.isInput(input)) {
      return new AptosSimulateTransaction(AptosGenesisTransaction.create(input));
    }
    if (AptosBlockMetadataTransaction.isInput(input)) {
      return new AptosSimulateTransaction(AptosBlockMetadataTransaction.create(input));
    }
    if (AptosStateCheckpointTransaction.isInput(input)) {
      return new AptosSimulateTransaction(AptosStateCheckpointTransaction.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosSimulateTransactionJSON): AptosSimulateTransaction {
    if (AptosPendingTransaction.isJSON(json)) {
      return new AptosSimulateTransaction(AptosPendingTransaction.fromJSON(json));
    }
    if (AptosUserTransaction.isJSON(json)) {
      return new AptosSimulateTransaction(AptosUserTransaction.fromJSON(json));
    }
    if (AptosGenesisTransaction.isJSON(json)) {
      return new AptosSimulateTransaction(AptosGenesisTransaction.fromJSON(json));
    }
    if (AptosBlockMetadataTransaction.isJSON(json)) {
      return new AptosSimulateTransaction(AptosBlockMetadataTransaction.fromJSON(json));
    }
    if (AptosStateCheckpointTransaction.isJSON(json)) {
      return new AptosSimulateTransaction(AptosStateCheckpointTransaction.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosSimulateTransaction (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction) {}

  public toJSON(): AptosSimulateTransactionJSON {
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
