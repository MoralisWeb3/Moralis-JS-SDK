import { AptosPendingTransaction, AptosPendingTransactionJSON, AptosPendingTransactionInput } from '../types/AptosPendingTransaction';
import { AptosUserTransaction, AptosUserTransactionJSON, AptosUserTransactionInput } from '../types/AptosUserTransaction';
import { AptosGenesisTransaction, AptosGenesisTransactionJSON, AptosGenesisTransactionInput } from '../types/AptosGenesisTransaction';
import { AptosBlockMetadataTransaction, AptosBlockMetadataTransactionJSON, AptosBlockMetadataTransactionInput } from '../types/AptosBlockMetadataTransaction';
import { AptosStateCheckpointTransaction, AptosStateCheckpointTransactionJSON, AptosStateCheckpointTransactionInput } from '../types/AptosStateCheckpointTransaction';

// $ref: #/paths/~1transactions~1by_version~1{txn_version}/get/responses/200/content/application~1json/schema
// typeName: getTransactionByVersion
// unionType: oneOf

export type AptosGetTransactionByVersionJSON = AptosPendingTransactionJSON | AptosUserTransactionJSON | AptosGenesisTransactionJSON | AptosBlockMetadataTransactionJSON | AptosStateCheckpointTransactionJSON;
export type AptosGetTransactionByVersionInput = AptosPendingTransactionInput | AptosUserTransactionInput | AptosGenesisTransactionInput | AptosBlockMetadataTransactionInput | AptosStateCheckpointTransactionInput;

export class AptosGetTransactionByVersion {
  public static create(input: AptosGetTransactionByVersionInput | AptosGetTransactionByVersion): AptosGetTransactionByVersion {
    if (input instanceof AptosGetTransactionByVersion) {
      return input;
    }
    if (AptosPendingTransaction.isInput(input)) {
      return new AptosGetTransactionByVersion(AptosPendingTransaction.create(input));
    }
    if (AptosUserTransaction.isInput(input)) {
      return new AptosGetTransactionByVersion(AptosUserTransaction.create(input));
    }
    if (AptosGenesisTransaction.isInput(input)) {
      return new AptosGetTransactionByVersion(AptosGenesisTransaction.create(input));
    }
    if (AptosBlockMetadataTransaction.isInput(input)) {
      return new AptosGetTransactionByVersion(AptosBlockMetadataTransaction.create(input));
    }
    if (AptosStateCheckpointTransaction.isInput(input)) {
      return new AptosGetTransactionByVersion(AptosStateCheckpointTransaction.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosGetTransactionByVersionJSON): AptosGetTransactionByVersion {
    if (AptosPendingTransaction.isJSON(json)) {
      return new AptosGetTransactionByVersion(AptosPendingTransaction.fromJSON(json));
    }
    if (AptosUserTransaction.isJSON(json)) {
      return new AptosGetTransactionByVersion(AptosUserTransaction.fromJSON(json));
    }
    if (AptosGenesisTransaction.isJSON(json)) {
      return new AptosGetTransactionByVersion(AptosGenesisTransaction.fromJSON(json));
    }
    if (AptosBlockMetadataTransaction.isJSON(json)) {
      return new AptosGetTransactionByVersion(AptosBlockMetadataTransaction.fromJSON(json));
    }
    if (AptosStateCheckpointTransaction.isJSON(json)) {
      return new AptosGetTransactionByVersion(AptosStateCheckpointTransaction.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosGetTransactionByVersion (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction) {}

  public toJSON(): AptosGetTransactionByVersionJSON {
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
