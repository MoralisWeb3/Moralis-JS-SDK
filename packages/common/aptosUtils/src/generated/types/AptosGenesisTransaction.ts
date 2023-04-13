import { AptosGenesisTransactionChangesItem, AptosGenesisTransactionChangesItemValue, AptosGenesisTransactionChangesItemInput, AptosGenesisTransactionChangesItemJSON } from '../types/AptosGenesisTransactionChangesItem';
import { AptosWriteSetPayload, AptosWriteSetPayloadInput, AptosWriteSetPayloadJSON } from '../types/AptosWriteSetPayload';
import { AptosTransactionEvent, AptosTransactionEventInput, AptosTransactionEventJSON } from '../types/AptosTransactionEvent';

// $ref: #/components/schemas/GenesisTransaction
// type: GenesisTransaction
// properties:
// - type ($ref: #/components/schemas/GenesisTransaction/properties/type)
// - version ($ref: #/components/schemas/GenesisTransaction/properties/version)
// - hash ($ref: #/components/schemas/GenesisTransaction/properties/hash)
// - state_change_hash ($ref: #/components/schemas/GenesisTransaction/properties/state_change_hash)
// - event_root_hash ($ref: #/components/schemas/GenesisTransaction/properties/event_root_hash)
// - state_checkpoint_hash ($ref: #/components/schemas/GenesisTransaction/properties/state_checkpoint_hash)
// - gas_used ($ref: #/components/schemas/GenesisTransaction/properties/gas_used)
// - success ($ref: #/components/schemas/GenesisTransaction/properties/success)
// - vm_status ($ref: #/components/schemas/GenesisTransaction/properties/vm_status)
// - accumulator_root_hash ($ref: #/components/schemas/GenesisTransaction/properties/accumulator_root_hash)
// - changes ($ref: #/components/schemas/GenesisTransaction/properties/changes/items)
// - payload ($ref: #/components/schemas/WriteSetPayload)
// - events ($ref: #/components/schemas/TransactionEvent)

export interface AptosGenesisTransactionJSON {
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
  readonly changes: AptosGenesisTransactionChangesItemJSON[];
  readonly payload: AptosWriteSetPayloadJSON;
  readonly events: AptosTransactionEventJSON[];
}

export interface AptosGenesisTransactionInput {
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
  readonly changes: AptosGenesisTransactionChangesItemInput[] | AptosGenesisTransactionChangesItemValue[];
  readonly payload: AptosWriteSetPayloadInput | AptosWriteSetPayload;
  readonly events: AptosTransactionEventInput[] | AptosTransactionEvent[];
}

export class AptosGenesisTransaction {
  public static create(input: AptosGenesisTransactionInput | AptosGenesisTransaction): AptosGenesisTransaction {
    if (input instanceof AptosGenesisTransaction) {
      return input;
    }
    return new AptosGenesisTransaction(input);
  }

  public static fromJSON(json: AptosGenesisTransactionJSON): AptosGenesisTransaction {
    const input: AptosGenesisTransactionInput = {
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
      changes: json.changes.map((item) => AptosGenesisTransactionChangesItem.fromJSON(item)),
      payload: AptosWriteSetPayload.fromJSON(json.payload),
      events: json.events.map((item) => AptosTransactionEvent.fromJSON(item)),
    };
    return AptosGenesisTransaction.create(input);
  }

  public static isInput(input: any): input is AptosGenesisTransactionInput {
    return input.type === 'genesis_transaction';
  }

  public static isJSON(json: any): json is AptosGenesisTransactionJSON {
    return json.type === 'genesis_transaction';
  }

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
  public readonly changes: AptosGenesisTransactionChangesItemValue[];
  /**
   * @description A writeset payload, used only for genesis
   */
  public readonly payload: AptosWriteSetPayload;
  /**
   * @description Events generated by the transaction
   */
  public readonly events: AptosTransactionEvent[];

  private constructor(input: AptosGenesisTransactionInput) {
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
    this.changes = input.changes.map((item) => AptosGenesisTransactionChangesItem.create(item));
    this.payload = AptosWriteSetPayload.create(input.payload);
    this.events = input.events.map((item) => AptosTransactionEvent.create(item));
  }

  public toJSON(): AptosGenesisTransactionJSON {
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
      changes: this.changes.map((item) => AptosGenesisTransactionChangesItem.toJSON(item)),
      payload: this.payload.toJSON(),
      events: this.events.map((item) => item.toJSON()),
    }
  }
}
