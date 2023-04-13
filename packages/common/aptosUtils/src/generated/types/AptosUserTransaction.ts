import { AptosUserTransactionChangesItem, AptosUserTransactionChangesItemValue, AptosUserTransactionChangesItemInput, AptosUserTransactionChangesItemJSON } from '../types/AptosUserTransactionChangesItem';
import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosUserTransactionPayload, AptosUserTransactionPayloadValue, AptosUserTransactionPayloadInput, AptosUserTransactionPayloadJSON } from '../types/AptosUserTransactionPayload';
import { AptosUserTransactionSignature, AptosUserTransactionSignatureValue, AptosUserTransactionSignatureInput, AptosUserTransactionSignatureJSON } from '../types/AptosUserTransactionSignature';
import { AptosTransactionEvent, AptosTransactionEventInput, AptosTransactionEventJSON } from '../types/AptosTransactionEvent';

// $ref: #/components/schemas/UserTransaction
// type: UserTransaction
// properties:
// - type ($ref: #/components/schemas/UserTransaction/properties/type)
// - version ($ref: #/components/schemas/UserTransaction/properties/version)
// - hash ($ref: #/components/schemas/UserTransaction/properties/hash)
// - state_change_hash ($ref: #/components/schemas/UserTransaction/properties/state_change_hash)
// - event_root_hash ($ref: #/components/schemas/UserTransaction/properties/event_root_hash)
// - state_checkpoint_hash ($ref: #/components/schemas/UserTransaction/properties/state_checkpoint_hash)
// - gas_used ($ref: #/components/schemas/UserTransaction/properties/gas_used)
// - success ($ref: #/components/schemas/UserTransaction/properties/success)
// - vm_status ($ref: #/components/schemas/UserTransaction/properties/vm_status)
// - accumulator_root_hash ($ref: #/components/schemas/UserTransaction/properties/accumulator_root_hash)
// - changes ($ref: #/components/schemas/UserTransaction/properties/changes/items)
// - sender ($ref: #/components/schemas/UserTransaction/properties/sender)
// - sequence_number ($ref: #/components/schemas/UserTransaction/properties/sequence_number)
// - max_gas_amount ($ref: #/components/schemas/UserTransaction/properties/max_gas_amount)
// - gas_unit_price ($ref: #/components/schemas/UserTransaction/properties/gas_unit_price)
// - expiration_timestamp_secs ($ref: #/components/schemas/UserTransaction/properties/expiration_timestamp_secs)
// - payload ($ref: #/components/schemas/UserTransaction/properties/payload)
// - signature ($ref: #/components/schemas/UserTransaction/properties/signature)
// - events ($ref: #/components/schemas/TransactionEvent)
// - timestamp ($ref: #/components/schemas/UserTransaction/properties/timestamp)

export interface AptosUserTransactionJSON {
  readonly type: string;
  readonly version: string;
  readonly hash: string;
  readonly state_change_hash: string;
  readonly event_root_hash: string;
  readonly state_checkpoint_hash: string;
  readonly gas_used: string;
  readonly success: boolean;
  readonly vm_status: string;
  readonly accumulator_root_hash: string;
  readonly changes: AptosUserTransactionChangesItemJSON[];
  readonly sender: AptosAddressJSON;
  readonly sequence_number: string;
  readonly max_gas_amount: string;
  readonly gas_unit_price: string;
  readonly expiration_timestamp_secs: string;
  readonly payload: AptosUserTransactionPayloadJSON;
  readonly signature: AptosUserTransactionSignatureJSON;
  readonly events: AptosTransactionEventJSON[];
  readonly timestamp: string;
}

export interface AptosUserTransactionInput {
  readonly type: string;
  readonly version: string;
  readonly hash: string;
  readonly stateChangeHash: string;
  readonly eventRootHash: string;
  readonly stateCheckpointHash: string;
  readonly gasUsed: string;
  readonly success: boolean;
  readonly vmStatus: string;
  readonly accumulatorRootHash: string;
  readonly changes: AptosUserTransactionChangesItemInput[] | AptosUserTransactionChangesItemValue[];
  readonly sender: AptosAddressInput | AptosAddress;
  readonly sequenceNumber: string;
  readonly maxGasAmount: string;
  readonly gasUnitPrice: string;
  readonly expirationTimestampSecs: string;
  readonly payload: AptosUserTransactionPayloadInput | AptosUserTransactionPayloadValue;
  readonly signature: AptosUserTransactionSignatureInput | AptosUserTransactionSignatureValue;
  readonly events: AptosTransactionEventInput[] | AptosTransactionEvent[];
  readonly timestamp: string;
}

export class AptosUserTransaction {
  public static create(input: AptosUserTransactionInput | AptosUserTransaction): AptosUserTransaction {
    if (input instanceof AptosUserTransaction) {
      return input;
    }
    return new AptosUserTransaction(input);
  }

  public static fromJSON(json: AptosUserTransactionJSON): AptosUserTransaction {
    const input: AptosUserTransactionInput = {
      type: json.type,
      version: json.version,
      hash: json.hash,
      stateChangeHash: json.state_change_hash,
      eventRootHash: json.event_root_hash,
      stateCheckpointHash: json.state_checkpoint_hash,
      gasUsed: json.gas_used,
      success: json.success,
      vmStatus: json.vm_status,
      accumulatorRootHash: json.accumulator_root_hash,
      changes: json.changes.map((item) => AptosUserTransactionChangesItem.fromJSON(item)),
      sender: AptosAddress.fromJSON(json.sender),
      sequenceNumber: json.sequence_number,
      maxGasAmount: json.max_gas_amount,
      gasUnitPrice: json.gas_unit_price,
      expirationTimestampSecs: json.expiration_timestamp_secs,
      payload: AptosUserTransactionPayload.fromJSON(json.payload),
      signature: AptosUserTransactionSignature.fromJSON(json.signature),
      events: json.events.map((item) => AptosTransactionEvent.fromJSON(item)),
      timestamp: json.timestamp,
    };
    return AptosUserTransaction.create(input);
  }

  public static isInput(input: any): input is AptosUserTransactionInput {
    return input.type === 'user_transaction';
  }

  public static isJSON(json: any): json is AptosUserTransactionJSON {
    return json.type === 'user_transaction';
  }

  /**
   * @description user_transaction
   */
  public readonly type: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly version: string;
  public readonly hash: string;
  public readonly stateChangeHash: string;
  public readonly eventRootHash: string;
  public readonly stateCheckpointHash: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly gasUsed: string;
  /**
   * @description Whether the transaction was successful
   */
  public readonly success: boolean;
  /**
   * @description The VM status of the transaction, can tell useful information in a failure
   */
  public readonly vmStatus: string;
  public readonly accumulatorRootHash: string;
  public readonly changes: AptosUserTransactionChangesItemValue[];
  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly sender: AptosAddress;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly sequenceNumber: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly maxGasAmount: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly gasUnitPrice: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly expirationTimestampSecs: string;
  public readonly payload: AptosUserTransactionPayloadValue;
  public readonly signature: AptosUserTransactionSignatureValue;
  /**
   * @description Events generated by the transaction
   */
  public readonly events: AptosTransactionEvent[];
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly timestamp: string;

  private constructor(input: AptosUserTransactionInput) {
    this.type = input.type;
    this.version = input.version;
    this.hash = input.hash;
    this.stateChangeHash = input.stateChangeHash;
    this.eventRootHash = input.eventRootHash;
    this.stateCheckpointHash = input.stateCheckpointHash;
    this.gasUsed = input.gasUsed;
    this.success = input.success;
    this.vmStatus = input.vmStatus;
    this.accumulatorRootHash = input.accumulatorRootHash;
    this.changes = input.changes.map((item) => AptosUserTransactionChangesItem.create(item));
    this.sender = AptosAddress.create(input.sender);
    this.sequenceNumber = input.sequenceNumber;
    this.maxGasAmount = input.maxGasAmount;
    this.gasUnitPrice = input.gasUnitPrice;
    this.expirationTimestampSecs = input.expirationTimestampSecs;
    this.payload = AptosUserTransactionPayload.create(input.payload);
    this.signature = AptosUserTransactionSignature.create(input.signature);
    this.events = input.events.map((item) => AptosTransactionEvent.create(item));
    this.timestamp = input.timestamp;
  }

  public toJSON(): AptosUserTransactionJSON {
    return {
      type: this.type,
      version: this.version,
      hash: this.hash,
      state_change_hash: this.stateChangeHash,
      event_root_hash: this.eventRootHash,
      state_checkpoint_hash: this.stateCheckpointHash,
      gas_used: this.gasUsed,
      success: this.success,
      vm_status: this.vmStatus,
      accumulator_root_hash: this.accumulatorRootHash,
      changes: this.changes.map((item) => AptosUserTransactionChangesItem.toJSON(item)),
      sender: this.sender.toJSON(),
      sequence_number: this.sequenceNumber,
      max_gas_amount: this.maxGasAmount,
      gas_unit_price: this.gasUnitPrice,
      expiration_timestamp_secs: this.expirationTimestampSecs,
      payload: AptosUserTransactionPayload.toJSON(this.payload),
      signature: AptosUserTransactionSignature.toJSON(this.signature),
      events: this.events.map((item) => item.toJSON()),
      timestamp: this.timestamp,
    }
  }
}
