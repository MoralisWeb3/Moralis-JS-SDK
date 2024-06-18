import { EvmDefiProtocolPosition, EvmDefiProtocolPositionInput, EvmDefiProtocolPositionJSON } from '../types/EvmDefiProtocolPosition';

// $ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema
// type: getDefiPositionsByProtocol
// properties:
// - protocol_name ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema/properties/protocol_name)
// - protocol_id ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema/properties/protocol_id)
// - protocol_url ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema/properties/protocol_url)
// - protocol_logo ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema/properties/protocol_logo)
// - total_usd_value ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema/properties/total_usd_value)
// - total_unclaimed_usd_value ($ref: #/paths/~1wallets~1{address}~1defi~1{protocol}~1positions/get/responses/200/content/application~1json/schema/properties/total_unclaimed_usd_value)
// - positions ($ref: #/components/schemas/defiProtocolPosition)

export interface EvmGetDefiPositionsByProtocolJSON {
  readonly protocol_name?: string;
  readonly protocol_id?: string;
  readonly protocol_url?: string;
  readonly protocol_logo?: string;
  readonly total_usd_value?: number;
  readonly total_unclaimed_usd_value?: number;
  readonly positions?: EvmDefiProtocolPositionJSON[];
}

export interface EvmGetDefiPositionsByProtocolInput {
  readonly protocolName?: string;
  readonly protocolId?: string;
  readonly protocolUrl?: string;
  readonly protocolLogo?: string;
  readonly totalUsdValue?: number;
  readonly totalUnclaimedUsdValue?: number;
  readonly positions?: EvmDefiProtocolPositionInput[] | EvmDefiProtocolPosition[];
}

export class EvmGetDefiPositionsByProtocol {
  public static create(input: EvmGetDefiPositionsByProtocolInput | EvmGetDefiPositionsByProtocol): EvmGetDefiPositionsByProtocol {
    if (input instanceof EvmGetDefiPositionsByProtocol) {
      return input;
    }
    return new EvmGetDefiPositionsByProtocol(input);
  }

  public static fromJSON(json: EvmGetDefiPositionsByProtocolJSON): EvmGetDefiPositionsByProtocol {
    const input: EvmGetDefiPositionsByProtocolInput = {
      protocolName: json.protocol_name,
      protocolId: json.protocol_id,
      protocolUrl: json.protocol_url,
      protocolLogo: json.protocol_logo,
      totalUsdValue: json.total_usd_value,
      totalUnclaimedUsdValue: json.total_unclaimed_usd_value,
      positions: json.positions ? json.positions.map((item) => EvmDefiProtocolPosition.fromJSON(item)) : undefined,
    };
    return EvmGetDefiPositionsByProtocol.create(input);
  }

  /**
   * @description The name of the protocol
   */
  public readonly protocolName?: string;
  /**
   * @description The id of the protocol
   */
  public readonly protocolId?: string;
  /**
   * @description The url of the protocol
   */
  public readonly protocolUrl?: string;
  /**
   * @description The logo of the protocol
   */
  public readonly protocolLogo?: string;
  public readonly totalUsdValue?: number;
  public readonly totalUnclaimedUsdValue?: number;
  public readonly positions?: EvmDefiProtocolPosition[];

  private constructor(input: EvmGetDefiPositionsByProtocolInput) {
    this.protocolName = input.protocolName;
    this.protocolId = input.protocolId;
    this.protocolUrl = input.protocolUrl;
    this.protocolLogo = input.protocolLogo;
    this.totalUsdValue = input.totalUsdValue;
    this.totalUnclaimedUsdValue = input.totalUnclaimedUsdValue;
    this.positions = input.positions ? input.positions.map((item) => EvmDefiProtocolPosition.create(item)) : undefined;
  }

  public toJSON(): EvmGetDefiPositionsByProtocolJSON {
    return {
      protocol_name: this.protocolName,
      protocol_id: this.protocolId,
      protocol_url: this.protocolUrl,
      protocol_logo: this.protocolLogo,
      total_usd_value: this.totalUsdValue,
      total_unclaimed_usd_value: this.totalUnclaimedUsdValue,
      positions: this.positions ? this.positions.map((item) => item.toJSON()) : undefined,
    }
  }
}
