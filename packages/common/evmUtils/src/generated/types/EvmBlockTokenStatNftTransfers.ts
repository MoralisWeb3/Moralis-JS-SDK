// $ref: #/components/schemas/blockTokenStat/properties/nft_transfers
// type: blockTokenStat_nft_transfers
// properties:
// - total ($ref: #/components/schemas/blockTokenStat/properties/nft_transfers/properties/total)

export interface EvmBlockTokenStatNftTransfersJSON {
  readonly total: string;
}

export interface EvmBlockTokenStatNftTransfersInput {
  readonly total: string;
}

export class EvmBlockTokenStatNftTransfers {
  public static create(input: EvmBlockTokenStatNftTransfersInput | EvmBlockTokenStatNftTransfers): EvmBlockTokenStatNftTransfers {
    if (input instanceof EvmBlockTokenStatNftTransfers) {
      return input;
    }
    return new EvmBlockTokenStatNftTransfers(input);
  }

  public static fromJSON(json: EvmBlockTokenStatNftTransfersJSON): EvmBlockTokenStatNftTransfers {
    const input: EvmBlockTokenStatNftTransfersInput = {
      total: json.total,
    };
    return EvmBlockTokenStatNftTransfers.create(input);
  }

  /**
   * @description The number of NFT transfers made in a block
   */
  public readonly total: string;

  private constructor(input: EvmBlockTokenStatNftTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmBlockTokenStatNftTransfersJSON {
    return {
      total: this.total,
    }
  }
}
