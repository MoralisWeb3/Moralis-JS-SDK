import { EvmNftCollectionStatOwners, EvmNftCollectionStatOwnersInput, EvmNftCollectionStatOwnersJSON } from '../types/EvmNftCollectionStatOwners';
import { EvmNftCollectionStatTransfers, EvmNftCollectionStatTransfersInput, EvmNftCollectionStatTransfersJSON } from '../types/EvmNftCollectionStatTransfers';

// $ref: #/components/schemas/nftCollectionStat
// type: nftCollectionStat
// properties:
// - total_tokens ($ref: #/components/schemas/nftCollectionStat/properties/total_tokens)
// - owners ($ref: #/components/schemas/nftCollectionStat/properties/owners)
// - transfers ($ref: #/components/schemas/nftCollectionStat/properties/transfers)

export interface EvmNftCollectionStatJSON {
  readonly total_tokens: string;
  readonly owners: EvmNftCollectionStatOwnersJSON;
  readonly transfers: EvmNftCollectionStatTransfersJSON;
}

export interface EvmNftCollectionStatInput {
  readonly totalTokens: string;
  readonly owners: EvmNftCollectionStatOwnersInput | EvmNftCollectionStatOwners;
  readonly transfers: EvmNftCollectionStatTransfersInput | EvmNftCollectionStatTransfers;
}

export class EvmNftCollectionStat {
  public static create(input: EvmNftCollectionStatInput | EvmNftCollectionStat): EvmNftCollectionStat {
    if (input instanceof EvmNftCollectionStat) {
      return input;
    }
    return new EvmNftCollectionStat(input);
  }

  public static fromJSON(json: EvmNftCollectionStatJSON): EvmNftCollectionStat {
    const input: EvmNftCollectionStatInput = {
      totalTokens: json.total_tokens,
      owners: EvmNftCollectionStatOwners.fromJSON(json.owners),
      transfers: EvmNftCollectionStatTransfers.fromJSON(json.transfers),
    };
    return EvmNftCollectionStat.create(input);
  }

  /**
   * @description The number of tokens in the collection
   */
  public readonly totalTokens: string;
  /**
   * @description NFT collection owner stats
   */
  public readonly owners: EvmNftCollectionStatOwners;
  /**
   * @description NFT collection transfer stats
   */
  public readonly transfers: EvmNftCollectionStatTransfers;

  private constructor(input: EvmNftCollectionStatInput) {
    this.totalTokens = input.totalTokens;
    this.owners = EvmNftCollectionStatOwners.create(input.owners);
    this.transfers = EvmNftCollectionStatTransfers.create(input.transfers);
  }

  public toJSON(): EvmNftCollectionStatJSON {
    return {
      total_tokens: this.totalTokens,
      owners: this.owners.toJSON(),
      transfers: this.transfers.toJSON(),
    }
  }
}
