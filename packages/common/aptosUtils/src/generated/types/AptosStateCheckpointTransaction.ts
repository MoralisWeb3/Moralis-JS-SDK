import { AptosStateCheckpointTransactionChanges, AptosStateCheckpointTransactionChangesValue, AptosStateCheckpointTransactionChangesInput, AptosStateCheckpointTransactionChangesJSON } from '../types/AptosStateCheckpointTransactionChanges';

// $ref: #/components/schemas/StateCheckpointTransaction
// type: StateCheckpointTransaction
// properties:
// - type ($ref: #/components/schemas/StateCheckpointTransaction/properties/type)
// - version ($ref: #/components/schemas/StateCheckpointTransaction/properties/version)
// - hash ($ref: #/components/schemas/StateCheckpointTransaction/properties/hash)
// - state_change_hash ($ref: #/components/schemas/StateCheckpointTransaction/properties/state_change_hash)
// - event_root_hash ($ref: #/components/schemas/StateCheckpointTransaction/properties/event_root_hash)
// - state_checkpoint_hash ($ref: #/components/schemas/StateCheckpointTransaction/properties/state_checkpoint_hash)
// - gas_used ($ref: #/components/schemas/StateCheckpointTransaction/properties/gas_used)
// - success ($ref: #/components/schemas/StateCheckpointTransaction/properties/success)
// - vm_status ($ref: #/components/schemas/StateCheckpointTransaction/properties/vm_status)
// - accumulator_root_hash ($ref: #/components/schemas/StateCheckpointTransaction/properties/accumulator_root_hash)
// - changes ($ref: #/components/schemas/StateCheckpointTransaction/properties/changes)
// - timestamp ($ref: #/components/schemas/StateCheckpointTransaction/properties/timestamp)

export interface AptosStateCheckpointTransactionJSON {
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
  readonly changes: AptosStateCheckpointTransactionChangesJSON;
  readonly timestamp: string;
}

export interface AptosStateCheckpointTransactionInput {
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
  readonly changes: AptosStateCheckpointTransactionChangesInput | AptosStateCheckpointTransactionChangesValue;
  readonly timestamp: string;
}

export class AptosStateCheckpointTransaction {
  public static create(input: AptosStateCheckpointTransactionInput | AptosStateCheckpointTransaction): AptosStateCheckpointTransaction {
    if (input instanceof AptosStateCheckpointTransaction) {
      return input;
    }
    return new AptosStateCheckpointTransaction(input);
  }

  public static fromJSON(json: AptosStateCheckpointTransactionJSON): AptosStateCheckpointTransaction {
    const input: AptosStateCheckpointTransactionInput = {
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
      changes: AptosStateCheckpointTransactionChanges.fromJSON(json.changes),
      timestamp: json.timestamp,
    };
    return AptosStateCheckpointTransaction.create(input);
  }

  public static isInput(input: any): input is AptosStateCheckpointTransactionInput {
    return input.type && input.type.includes('checkpoint');
  }

  public static isJSON(json: any): json is AptosStateCheckpointTransactionJSON {
    return json.type && json.type.includes('checkpoint');
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
  public readonly changes: AptosStateCheckpointTransactionChangesValue;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly timestamp: string;

  private constructor(input: AptosStateCheckpointTransactionInput) {
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
    this.changes = AptosStateCheckpointTransactionChanges.create(input.changes);
    this.timestamp = input.timestamp;
  }

  public toJSON(): AptosStateCheckpointTransactionJSON {
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
      changes: this.changes.toJSON(),
      timestamp: this.timestamp,
    }
  }
}
