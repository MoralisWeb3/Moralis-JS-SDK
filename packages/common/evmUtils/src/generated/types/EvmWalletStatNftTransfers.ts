// $ref: #/components/schemas/walletStat/properties/nft_transfers
// type: walletStat_nft_transfers
// properties:
// - total ($ref: #/components/schemas/walletStat/properties/nft_transfers/properties/total)

export interface EvmWalletStatNftTransfersJSON {
  readonly total: string;
}

export interface EvmWalletStatNftTransfersInput {
  readonly total: string;
}

export class EvmWalletStatNftTransfers {
  public static create(input: EvmWalletStatNftTransfersInput | EvmWalletStatNftTransfers): EvmWalletStatNftTransfers {
    if (input instanceof EvmWalletStatNftTransfers) {
      return input;
    }
    return new EvmWalletStatNftTransfers(input);
  }

  public static fromJSON(json: EvmWalletStatNftTransfersJSON): EvmWalletStatNftTransfers {
    const input: EvmWalletStatNftTransfersInput = {
      total: json.total,
    };
    return EvmWalletStatNftTransfers.create(input);
  }

  /**
   * @description The number of NFT transfers of a wallet
   */
  public readonly total: string;

  private constructor(input: EvmWalletStatNftTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmWalletStatNftTransfersJSON {
    return {
      total: this.total,
    }
  }
}
