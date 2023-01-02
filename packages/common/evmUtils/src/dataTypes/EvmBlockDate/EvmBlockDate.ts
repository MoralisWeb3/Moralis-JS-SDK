import { EvmBlockDateData, EvmBlockDateInput } from './types';

export type EvmBlockDateish = EvmBlockDateInput | EvmBlockDate;

export class EvmBlockDate {
  /**
   * Create a new instance of EvmBlockDate.
   * @param data - the EvmBlockDateish type.
   */
  public static create(data: EvmBlockDateish) {
    if (data instanceof EvmBlockDate) {
      return data;
    }
    return new EvmBlockDate(EvmBlockDate.parse(data));
  }

  private static parse(input: EvmBlockDateInput): EvmBlockDateData {
    return {
      block: input.block,
      date: new Date(input.date),
      timestamp: input.timestamp,
      // TODO: the swagger currently has wrong type for `block_timestamp`, should be `string`.
      blockTimestamp: String(input.block_timestamp),
      hash: input.hash,
      parentHash: input.parent_hash,
    };
  }

  private constructor(private readonly data: EvmBlockDateData) {}

  /**
   * @description The block number.
   * @example `9193266`
   */
  public get block(): number {
    return this.data.block;
  }

  /**
   * @description The date of the block.
   * @example `2020-01-01T00:00:00+00:00`
   */
  public get date(): Date {
    return this.data.date;
  }

  /**
   * @description The timestamp of the block
   * @example `1577836811`
   */
  public get timestamp(): number {
    return this.data.timestamp;
  }

  /**
   * @description The timestamp of the block
   * @example `2022-01-03T22:59:39.000Z`
   */
  public get blockTimestamp(): string | undefined {
    return this.data.blockTimestamp;
  }

  /**
   * @deprecated Use `blockTimestamp` instead.
   */
  public get block_timestamp(): string | undefined {
    return this.data.blockTimestamp;
  }

  /**
   * @description The block hash.
   * @example `0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171`
   */
  public get hash(): string | undefined {
    return this.data.hash;
  }

  /**
   * @deprecated Use `hash` instead.
   */
  public get block_hash(): string | undefined {
    return this.data.hash;
  }

  /**
   * @description The block hash of the parent block.
   * @example `0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045`
   */
  public get parentHash(): string | undefined {
    return this.data.parentHash;
  }

  /**
   * @deprecated Use `parentHash` instead.
   */
  public get parent_hash(): string | undefined {
    return this.data.parentHash;
  }
}
