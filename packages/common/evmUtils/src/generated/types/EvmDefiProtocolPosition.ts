import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmDefiTokenBalance, EvmDefiTokenBalanceInput, EvmDefiTokenBalanceJSON } from '../types/EvmDefiTokenBalance';
import { EvmDefiPositionDetails, EvmDefiPositionDetailsInput, EvmDefiPositionDetailsJSON } from '../types/EvmDefiPositionDetails';

// $ref: #/components/schemas/defiProtocolPosition
// type: defiProtocolPosition
// properties:
// - address ($ref: #/components/schemas/defiProtocolPosition/properties/address)
// - balance_usd ($ref: #/components/schemas/defiProtocolPosition/properties/balance_usd)
// - total_unclaimed_usd_value ($ref: #/components/schemas/defiProtocolPosition/properties/total_unclaimed_usd_value)
// - tokens ($ref: #/components/schemas/defiTokenBalance)
// - position_details ($ref: #/components/schemas/defiPositionDetails)

export interface EvmDefiProtocolPositionJSON {
  readonly address?: EvmAddressJSON;
  readonly balance_usd?: number;
  readonly total_unclaimed_usd_value?: number;
  readonly tokens?: EvmDefiTokenBalanceJSON[];
  readonly position_details?: EvmDefiPositionDetailsJSON;
}

export interface EvmDefiProtocolPositionInput {
  readonly address?: EvmAddressInput | EvmAddress;
  readonly balanceUsd?: number;
  readonly totalUnclaimedUsdValue?: number;
  readonly tokens?: EvmDefiTokenBalanceInput[] | EvmDefiTokenBalance[];
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
      address: json.address ? EvmAddress.fromJSON(json.address) : undefined,
      balanceUsd: json.balance_usd,
      totalUnclaimedUsdValue: json.total_unclaimed_usd_value,
      tokens: json.tokens ? json.tokens.map((item) => EvmDefiTokenBalance.fromJSON(item)) : undefined,
      positionDetails: json.position_details ? EvmDefiPositionDetails.fromJSON(json.position_details) : undefined,
    };
    return EvmDefiProtocolPosition.create(input);
  }

  /**
   * @description The address of the position
   */
  public readonly address?: EvmAddress;
  /**
   * @description The balance in USD
   */
  public readonly balanceUsd?: number;
  /**
   * @description The total unclaimed USD value of the position
   */
  public readonly totalUnclaimedUsdValue?: number;
  public readonly tokens?: EvmDefiTokenBalance[];
  /**
   * @description The details of the position
   */
  public readonly positionDetails?: EvmDefiPositionDetails;

  private constructor(input: EvmDefiProtocolPositionInput) {
    this.address = input.address ? EvmAddress.create(input.address) : undefined;
    this.balanceUsd = input.balanceUsd;
    this.totalUnclaimedUsdValue = input.totalUnclaimedUsdValue;
    this.tokens = input.tokens ? input.tokens.map((item) => EvmDefiTokenBalance.create(item)) : undefined;
    this.positionDetails = input.positionDetails ? EvmDefiPositionDetails.create(input.positionDetails) : undefined;
  }

  public toJSON(): EvmDefiProtocolPositionJSON {
    return {
      address: this.address ? this.address.toJSON() : undefined,
      balance_usd: this.balanceUsd,
      total_unclaimed_usd_value: this.totalUnclaimedUsdValue,
      tokens: this.tokens ? this.tokens.map((item) => item.toJSON()) : undefined,
      position_details: this.positionDetails ? this.positionDetails.toJSON() : undefined,
    }
  }
}
