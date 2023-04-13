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
export type AptosGetTransactionByVersionValue = AptosPendingTransaction | AptosUserTransaction | AptosGenesisTransaction | AptosBlockMetadataTransaction | AptosStateCheckpointTransaction;

export abstract class AptosGetTransactionByVersion {
  public static create(input: AptosGetTransactionByVersionInput): AptosGetTransactionByVersionValue {
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
    throw new Error('Cannot resolve union from AptosGetTransactionByVersionInput');
  }

  public static fromJSON(json: AptosGetTransactionByVersionJSON): AptosGetTransactionByVersionValue {
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
    throw new Error(`Cannot resolve union from AptosGetTransactionByVersionJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosGetTransactionByVersionValue): AptosGetTransactionByVersionJSON {
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
    throw new Error('Cannot resolve union from AptosGetTransactionByVersionValue');
  }
}
