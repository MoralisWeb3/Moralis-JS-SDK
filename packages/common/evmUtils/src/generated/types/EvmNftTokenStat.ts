import { EvmNftTokenStatOwners, EvmNftTokenStatOwnersInput, EvmNftTokenStatOwnersJSON } from '../types/EvmNftTokenStatOwners';
import { EvmNftTokenStatTransfers, EvmNftTokenStatTransfersInput, EvmNftTokenStatTransfersJSON } from '../types/EvmNftTokenStatTransfers';

// $ref: #/components/schemas/nftTokenStat
// type: nftTokenStat
// properties:
// - owners ($ref: #/components/schemas/nftTokenStat/properties/owners)
// - transfers ($ref: #/components/schemas/nftTokenStat/properties/transfers)

export interface EvmNftTokenStatJSON {
  readonly owners: EvmNftTokenStatOwnersJSON;
  readonly transfers: EvmNftTokenStatTransfersJSON;
}

export interface EvmNftTokenStatInput {
  readonly owners: EvmNftTokenStatOwnersInput | EvmNftTokenStatOwners;
  readonly transfers: EvmNftTokenStatTransfersInput | EvmNftTokenStatTransfers;
}

export class EvmNftTokenStat {
  public static create(input: EvmNftTokenStatInput | EvmNftTokenStat): EvmNftTokenStat {
    if (input instanceof EvmNftTokenStat) {
      return input;
    }
    return new EvmNftTokenStat(input);
  }

  public static fromJSON(json: EvmNftTokenStatJSON): EvmNftTokenStat {
    const input: EvmNftTokenStatInput = {
      owners: EvmNftTokenStatOwners.fromJSON(json.owners),
      transfers: EvmNftTokenStatTransfers.fromJSON(json.transfers),
    };
    return EvmNftTokenStat.create(input);
  }

  /**
   * @description NFT token owner stats
   */
  public readonly owners: EvmNftTokenStatOwners;
  /**
   * @description NFT token transfer stats
   */
  public readonly transfers: EvmNftTokenStatTransfers;

  private constructor(input: EvmNftTokenStatInput) {
    this.owners = EvmNftTokenStatOwners.create(input.owners);
    this.transfers = EvmNftTokenStatTransfers.create(input.transfers);
  }

  public toJSON(): EvmNftTokenStatJSON {
    return {
      owners: this.owners.toJSON(),
      transfers: this.transfers.toJSON(),
    }
  }
}
