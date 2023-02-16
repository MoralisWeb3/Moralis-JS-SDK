import { AptosBlockTransactionsItem, AptosBlockTransactionsItemInput, AptosBlockTransactionsItemJSON } from '../types/AptosBlockTransactionsItem';

// $ref: #/components/schemas/Block
// type: Block
// properties:
// - block_height ($ref: #/components/schemas/Block/properties/block_height)
// - block_hash ($ref: #/components/schemas/Block/properties/block_hash)
// - block_timestamp ($ref: #/components/schemas/Block/properties/block_timestamp)
// - first_version ($ref: #/components/schemas/Block/properties/first_version)
// - last_version ($ref: #/components/schemas/Block/properties/last_version)
// - transactions ($ref: #/components/schemas/Block/properties/transactions/items)

export interface AptosBlockJSON {
  readonly block_height: string;
  readonly block_hash: string;
  readonly block_timestamp: string;
  readonly first_version: string;
  readonly last_version: string;
  readonly transactions: AptosBlockTransactionsItemJSON[];
}

export interface AptosBlockInput {
  readonly blockHeight: string;
  readonly blockHash: string;
  readonly blockTimestamp: string;
  readonly firstVersion: string;
  readonly lastVersion: string;
  readonly transactions: AptosBlockTransactionsItemInput[] | AptosBlockTransactionsItem[];
}

export class AptosBlock {
  public static create(input: AptosBlockInput | AptosBlock): AptosBlock {
    if (input instanceof AptosBlock) {
      return input;
    }
    return new AptosBlock(input);
  }

  public static fromJSON(json: AptosBlockJSON): AptosBlock {
    const input: AptosBlockInput = {
      blockHeight: json.block_height,
      blockHash: json.block_hash,
      blockTimestamp: json.block_timestamp,
      firstVersion: json.first_version,
      lastVersion: json.last_version,
      transactions: json.transactions.map((item) => AptosBlockTransactionsItem.fromJSON(item)),
    };
    return AptosBlock.create(input);
  }

  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly blockHeight: string;
  public readonly blockHash: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly blockTimestamp: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly firstVersion: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly lastVersion: string;
  /**
   * @description List of transactions
   */
  public readonly transactions: AptosBlockTransactionsItem[];

  private constructor(input: AptosBlockInput) {
    this.blockHeight = input.blockHeight;
    this.blockHash = input.blockHash;
    this.blockTimestamp = input.blockTimestamp;
    this.firstVersion = input.firstVersion;
    this.lastVersion = input.lastVersion;
    this.transactions = input.transactions.map((item) => AptosBlockTransactionsItem.create(item));
  }

  public toJSON(): AptosBlockJSON {
    return {
      block_height: this.blockHeight,
      block_hash: this.blockHash,
      block_timestamp: this.blockTimestamp,
      first_version: this.firstVersion,
      last_version: this.lastVersion,
      transactions: this.transactions.map((item) => item.toJSON()),
    }
  }
}
