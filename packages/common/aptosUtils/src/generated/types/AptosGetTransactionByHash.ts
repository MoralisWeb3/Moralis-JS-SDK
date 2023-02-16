import { AptosPendingTransaction, AptosPendingTransactionJSON, AptosPendingTransactionInput } from '../types/AptosPendingTransaction';
import { AptosUserTransaction, AptosUserTransactionJSON, AptosUserTransactionInput } from '../types/AptosUserTransaction';
import { AptosGenesisTransaction, AptosGenesisTransactionJSON, AptosGenesisTransactionInput } from '../types/AptosGenesisTransaction';
import { AptosBlockMetadataTransaction, AptosBlockMetadataTransactionJSON, AptosBlockMetadataTransactionInput } from '../types/AptosBlockMetadataTransaction';
import { AptosStateCheckpointTransaction, AptosStateCheckpointTransactionJSON, AptosStateCheckpointTransactionInput } from '../types/AptosStateCheckpointTransaction';

// $ref: #/paths/~1transactions~1by_hash~1{txn_hash}/get/responses/200/content/application~1json/schema
// typeName: getTransactionByHash
// unionType: oneOf

export type AptosGetTransactionByHashJSON = AptosPendingTransactionJSON | AptosUserTransactionJSON | AptosGenesisTransactionJSON | AptosBlockMetadataTransactionJSON | AptosStateCheckpointTransactionJSON;
export type AptosGetTransactionByHashInput = AptosPendingTransactionInput | AptosUserTransactionInput | AptosGenesisTransactionInput | AptosBlockMetadataTransactionInput | AptosStateCheckpointTransactionInput;

export class AptosGetTransactionByHash {
  public static create(input: AptosGetTransactionByHashInput | AptosGetTransactionByHash): AptosGetTransactionByHash {
    if (input instanceof AptosGetTransactionByHash) {
      return input;
    }
    if (AptosPendingTransaction.isInput(input)) {
      return new AptosGetTransactionByHash(AptosPendingTransaction.create(input));
    }
    if (AptosUserTransaction.isInput(input)) {
      return new AptosGetTransactionByHash(AptosUserTransaction.create(input));
    }
    if (AptosGenesisTransaction.isInput(input)) {
      return new AptosGetTransactionByHash(AptosGenesisTransaction.create(input));
    }
    if (AptosBlockMetadataTransaction.isInput(input)) {
      return new AptosGetTransactionByHash(AptosBlockMetadataTransaction.create(input));
    }
    if (AptosStateCheckpointTransaction.isInput(input)) {
      return new AptosGetTransactionByHash(AptosStateCheckpointTransaction.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosGetTransactionByHashJSON): AptosGetTransactionByHash {
    if (AptosPendingTransaction.isJSON(json)) {
      return new AptosGetTransactionByHash(AptosPendingTransaction.fromJSON(json));
    }
    if (AptosUserTransaction.isJSON(json)) {
      return new AptosGetTransactionByHash(AptosUserTransaction.fromJSON(json));
    }
    if (AptosGenesisTransaction.isJSON(json)) {
      return new AptosGetTransactionByHash(AptosGenesisTransaction.fromJSON(json));
    }
    if (AptosBlockMetadataTransaction.isJSON(json)) {
      return new AptosGetTransactionByHash(AptosBlockMetadataTransaction.fromJSON(json));
    }
    if (AptosStateCheckpointTransaction.isJSON(json)) {
      return new AptosGetTransactionByHash(AptosStateCheckpointTransaction.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosGetTransactionByHash (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction) {}

  public toJSON(): AptosGetTransactionByHashJSON {
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
