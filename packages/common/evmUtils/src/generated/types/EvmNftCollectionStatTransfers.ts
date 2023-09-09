// $ref: #/components/schemas/nftCollectionStat/properties/transfers
// type: nftCollectionStat_transfers
// properties:
// - total ($ref: #/components/schemas/nftCollectionStat/properties/transfers/properties/total)

export interface EvmNftCollectionStatTransfersJSON {
  readonly total: string;
}

export interface EvmNftCollectionStatTransfersInput {
  readonly total: string;
}

export class EvmNftCollectionStatTransfers {
  public static create(input: EvmNftCollectionStatTransfersInput | EvmNftCollectionStatTransfers): EvmNftCollectionStatTransfers {
    if (input instanceof EvmNftCollectionStatTransfers) {
      return input;
    }
    return new EvmNftCollectionStatTransfers(input);
  }

  public static fromJSON(json: EvmNftCollectionStatTransfersJSON): EvmNftCollectionStatTransfers {
    const input: EvmNftCollectionStatTransfersInput = {
      total: json.total,
    };
    return EvmNftCollectionStatTransfers.create(input);
  }

  /**
   * @description The number of transfers of the collection
   */
  public readonly total: string;

  private constructor(input: EvmNftCollectionStatTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmNftCollectionStatTransfersJSON {
    return {
      total: this.total,
    }
  }
}
