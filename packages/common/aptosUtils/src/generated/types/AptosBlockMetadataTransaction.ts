import { AptosBlockMetadataTransactionChanges, AptosBlockMetadataTransactionChangesValue, AptosBlockMetadataTransactionChangesInput, AptosBlockMetadataTransactionChangesJSON } from '../types/AptosBlockMetadataTransactionChanges';
import { AptosTransactionEvent, AptosTransactionEventInput, AptosTransactionEventJSON } from '../types/AptosTransactionEvent';

// $ref: #/components/schemas/BlockMetadataTransaction
// type: BlockMetadataTransaction
// properties:
// - type ($ref: #/components/schemas/BlockMetadataTransaction/properties/type)
// - version ($ref: #/components/schemas/BlockMetadataTransaction/properties/version)
// - hash ($ref: #/components/schemas/BlockMetadataTransaction/properties/hash)
// - state_change_hash ($ref: #/components/schemas/BlockMetadataTransaction/properties/state_change_hash)
// - event_root_hash ($ref: #/components/schemas/BlockMetadataTransaction/properties/event_root_hash)
// - state_checkpoint_hash ($ref: #/components/schemas/BlockMetadataTransaction/properties/state_checkpoint_hash)
// - gas_used ($ref: #/components/schemas/BlockMetadataTransaction/properties/gas_used)
// - success ($ref: #/components/schemas/BlockMetadataTransaction/properties/success)
// - vm_status ($ref: #/components/schemas/BlockMetadataTransaction/properties/vm_status)
// - accumulator_root_hash ($ref: #/components/schemas/BlockMetadataTransaction/properties/accumulator_root_hash)
// - changes ($ref: #/components/schemas/BlockMetadataTransaction/properties/changes)
// - id ($ref: #/components/schemas/BlockMetadataTransaction/properties/id)
// - epoch ($ref: #/components/schemas/BlockMetadataTransaction/properties/epoch)
// - round ($ref: #/components/schemas/BlockMetadataTransaction/properties/round)
// - events ($ref: #/components/schemas/TransactionEvent)
// - previous_block_votes_bitvec ($ref: #/components/schemas/BlockMetadataTransaction/properties/previous_block_votes_bitvec)
// - proposer ($ref: #/components/schemas/BlockMetadataTransaction/properties/proposer)
// - failed_proposer_indices ($ref: #/components/schemas/BlockMetadataTransaction/properties/failed_proposer_indices)
// - timestamp ($ref: #/components/schemas/BlockMetadataTransaction/properties/timestamp)

export interface AptosBlockMetadataTransactionJSON {
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
  readonly changes: AptosBlockMetadataTransactionChangesJSON;
  readonly id: string;
  readonly epoch: string;
  readonly round: string;
  readonly events: AptosTransactionEventJSON[];
  readonly previous_block_votes_bitvec: string[];
  readonly proposer: string;
  readonly failed_proposer_indices: string[];
  readonly timestamp: string;
}

export interface AptosBlockMetadataTransactionInput {
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
  readonly changes: AptosBlockMetadataTransactionChangesInput | AptosBlockMetadataTransactionChangesValue;
  readonly id: string;
  readonly epoch: string;
  readonly round: string;
  readonly events: AptosTransactionEventInput[] | AptosTransactionEvent[];
  readonly previousBlockVotesBitvec: string[];
  readonly proposer: string;
  readonly failedProposerIndices: string[];
  readonly timestamp: string;
}

export class AptosBlockMetadataTransaction {
  public static create(input: AptosBlockMetadataTransactionInput | AptosBlockMetadataTransaction): AptosBlockMetadataTransaction {
    if (input instanceof AptosBlockMetadataTransaction) {
      return input;
    }
    return new AptosBlockMetadataTransaction(input);
  }

  public static fromJSON(json: AptosBlockMetadataTransactionJSON): AptosBlockMetadataTransaction {
    const input: AptosBlockMetadataTransactionInput = {
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
      changes: AptosBlockMetadataTransactionChanges.fromJSON(json.changes),
      id: json.id,
      epoch: json.epoch,
      round: json.round,
      events: json.events.map((item) => AptosTransactionEvent.fromJSON(item)),
      previousBlockVotesBitvec: json.previous_block_votes_bitvec,
      proposer: json.proposer,
      failedProposerIndices: json.failed_proposer_indices,
      timestamp: json.timestamp,
    };
    return AptosBlockMetadataTransaction.create(input);
  }

  public static isInput(input: any): input is AptosBlockMetadataTransactionInput {
    return input.type === 'block_metadata_transaction';
  }

  public static isJSON(json: any): json is AptosBlockMetadataTransactionJSON {
    return json.type === 'block_metadata_transaction';
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
  public readonly changes: AptosBlockMetadataTransactionChangesValue;
  public readonly id: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly epoch: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly round: string;
  /**
   * @description he events emitted at the block creation
   */
  public readonly events: AptosTransactionEvent[];
  /**
   * @description Previous block votes
   */
  public readonly previousBlockVotesBitvec: string[];
  /**
   * @description A hex encoded 32 byte Aptos account address.S
   */
  public readonly proposer: string;
  /**
   * @description The indices of the proposers who failed to propose
   */
  public readonly failedProposerIndices: string[];
  /**
   * @description A string containing a 64-bit unsigned integer
   */
  public readonly timestamp: string;

  private constructor(input: AptosBlockMetadataTransactionInput) {
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
    this.changes = AptosBlockMetadataTransactionChanges.create(input.changes);
    this.id = input.id;
    this.epoch = input.epoch;
    this.round = input.round;
    this.events = input.events.map((item) => AptosTransactionEvent.create(item));
    this.previousBlockVotesBitvec = input.previousBlockVotesBitvec;
    this.proposer = input.proposer;
    this.failedProposerIndices = input.failedProposerIndices;
    this.timestamp = input.timestamp;
  }

  public toJSON(): AptosBlockMetadataTransactionJSON {
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
      id: this.id,
      epoch: this.epoch,
      round: this.round,
      events: this.events.map((item) => item.toJSON()),
      previous_block_votes_bitvec: this.previousBlockVotesBitvec,
      proposer: this.proposer,
      failed_proposer_indices: this.failedProposerIndices,
      timestamp: this.timestamp,
    }
  }
}
