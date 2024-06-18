import { EvmDefiTokenBalance, EvmDefiTokenBalanceInput, EvmDefiTokenBalanceJSON } from '../types/EvmDefiTokenBalance';
import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmDefiPositionDetails, EvmDefiPositionDetailsInput, EvmDefiPositionDetailsJSON } from '../types/EvmDefiPositionDetails';

// $ref: #/components/schemas/defiProtocolPosition
// type: defiProtocolPosition
// properties:
// - label ($ref: #/components/schemas/defiProtocolPosition/properties/label)
// - tokens ($ref: #/components/schemas/defiTokenBalance)
// - address ($ref: #/components/schemas/defiProtocolPosition/properties/address)
// - balance_usd ($ref: #/components/schemas/defiProtocolPosition/properties/balance_usd)
// - total_unclaimed_usd_value ($ref: #/components/schemas/defiProtocolPosition/properties/total_unclaimed_usd_value)
// - position_details ($ref: #/components/schemas/defiPositionDetails)

export interface EvmDefiProtocolPositionJSON {
  readonly label: string;
  readonly tokens: EvmDefiTokenBalanceJSON[];
  readonly address?: EvmAddressJSON;
  readonly balance_usd: number;
  readonly total_unclaimed_usd_value: number;
  readonly position_details?: EvmDefiPositionDetailsJSON;
}

export interface EvmDefiProtocolPositionInput {
  readonly label: string;
  readonly tokens: EvmDefiTokenBalanceInput[] | EvmDefiTokenBalance[];
  readonly address?: EvmAddressInput | EvmAddress;
  readonly balanceUsd: number;
  readonly totalUnclaimedUsdValue: number;
  readonly positionDetails?: EvmDefiPositionDetailsInput | EvmDefiPositionDetails;
}

export class EvmDefiProtocolPosition {
  public static create(input: EvmDefiProtocolPositionInput | EvmDefiProtocolPosition): EvmDefiProtocolPosition {
    if (input instanceof EvmDefiProtocolPosition) {
      return input;
    }
    return new EvmDefiProtocolPosition(input);
  }

  public static fromJSON(json: EvmDefiProtocolPositionJSON): EvmDefiProtocolPosition {
    const input: EvmDefiProtocolPositionInput = {
      label: json.label,
      tokens: json.tokens.map((item) => EvmDefiTokenBalance.fromJSON(item)),
      address: json.address ? EvmAddress.fromJSON(json.address) : undefined,
      balanceUsd: json.balance_usd,
      totalUnclaimedUsdValue: json.total_unclaimed_usd_value,
      positionDetails: json.position_details ? EvmDefiPositionDetails.fromJSON(json.position_details) : undefined,
    };
    return EvmDefiProtocolPosition.create(input);
  }

  /**
   * @description The label of the position
   */
  public readonly label: string;
  public readonly tokens: EvmDefiTokenBalance[];
  /**
   * @description The address of the position
   */
  public readonly address?: EvmAddress;
  /**
   * @description The balance in USD
   */
  public readonly balanceUsd: number;
  /**
   * @description The total unclaimed USD value of the position
   */
  public readonly totalUnclaimedUsdValue: number;
  /**
   * @description The details of the position
   */
  public readonly positionDetails?: EvmDefiPositionDetails;

  private constructor(input: EvmDefiProtocolPositionInput) {
    this.label = input.label;
    this.tokens = input.tokens.map((item) => EvmDefiTokenBalance.create(item));
    this.address = input.address ? EvmAddress.create(input.address) : undefined;
    this.balanceUsd = input.balanceUsd;
    this.totalUnclaimedUsdValue = input.totalUnclaimedUsdValue;
    this.positionDetails = input.positionDetails ? EvmDefiPositionDetails.create(input.positionDetails) : undefined;
  }

  public toJSON(): EvmDefiProtocolPositionJSON {
    return {
      label: this.label,
      tokens: this.tokens.map((item) => item.toJSON()),
      address: this.address ? this.address.toJSON() : undefined,
      balance_usd: this.balanceUsd,
      total_unclaimed_usd_value: this.totalUnclaimedUsdValue,
      position_details: this.positionDetails ? this.positionDetails.toJSON() : undefined,
    }
  }
}
