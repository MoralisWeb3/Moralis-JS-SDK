import { EvmErc20TokenStatTransfers, EvmErc20TokenStatTransfersInput, EvmErc20TokenStatTransfersJSON } from '../types/EvmErc20TokenStatTransfers';

// $ref: #/components/schemas/erc20TokenStat
// type: erc20TokenStat
// properties:
// - transfers ($ref: #/components/schemas/erc20TokenStat/properties/transfers)

export interface EvmErc20TokenStatJSON {
  readonly transfers: EvmErc20TokenStatTransfersJSON;
}

export interface EvmErc20TokenStatInput {
  readonly transfers: EvmErc20TokenStatTransfersInput | EvmErc20TokenStatTransfers;
}

export class EvmErc20TokenStat {
  public static create(input: EvmErc20TokenStatInput | EvmErc20TokenStat): EvmErc20TokenStat {
    if (input instanceof EvmErc20TokenStat) {
      return input;
    }
    return new EvmErc20TokenStat(input);
  }

  public static fromJSON(json: EvmErc20TokenStatJSON): EvmErc20TokenStat {
    const input: EvmErc20TokenStatInput = {
      transfers: EvmErc20TokenStatTransfers.fromJSON(json.transfers),
    };
    return EvmErc20TokenStat.create(input);
  }

  /**
   * @description ERC20 Token transfer stats
   */
  public readonly transfers: EvmErc20TokenStatTransfers;

  private constructor(input: EvmErc20TokenStatInput) {
    this.transfers = EvmErc20TokenStatTransfers.create(input.transfers);
  }

  public toJSON(): EvmErc20TokenStatJSON {
    return {
      transfers: this.transfers.toJSON(),
    }
  }
}
