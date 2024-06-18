import { EvmDefiProtocolPosition, EvmDefiProtocolPositionInput, EvmDefiProtocolPositionJSON } from '../types/EvmDefiProtocolPosition';

// $ref: #/components/schemas/defiPositionSummaryResponse
// type: defiPositionSummaryResponse
// properties:
// - protocol_name ($ref: #/components/schemas/defiPositionSummaryResponse/properties/protocol_name)
// - protocol_id ($ref: #/components/schemas/defiPositionSummaryResponse/properties/protocol_id)
// - protocol_url ($ref: #/components/schemas/defiPositionSummaryResponse/properties/protocol_url)
// - protocol_logo ($ref: #/components/schemas/defiPositionSummaryResponse/properties/protocol_logo)
// - position ($ref: #/components/schemas/defiProtocolPosition)

export interface EvmDefiPositionSummaryResponseJSON {
  readonly protocol_name?: string;
  readonly protocol_id?: string;
  readonly protocol_url?: string;
  readonly protocol_logo?: string;
  readonly position?: EvmDefiProtocolPositionJSON;
}

export interface EvmDefiPositionSummaryResponseInput {
  readonly protocolName?: string;
  readonly protocolId?: string;
  readonly protocolUrl?: string;
  readonly protocolLogo?: string;
  readonly position?: EvmDefiProtocolPositionInput | EvmDefiProtocolPosition;
}

export class EvmDefiPositionSummaryResponse {
  public static create(input: EvmDefiPositionSummaryResponseInput | EvmDefiPositionSummaryResponse): EvmDefiPositionSummaryResponse {
    if (input instanceof EvmDefiPositionSummaryResponse) {
      return input;
    }
    return new EvmDefiPositionSummaryResponse(input);
  }

  public static fromJSON(json: EvmDefiPositionSummaryResponseJSON): EvmDefiPositionSummaryResponse {
    const input: EvmDefiPositionSummaryResponseInput = {
      protocolName: json.protocol_name,
      protocolId: json.protocol_id,
      protocolUrl: json.protocol_url,
      protocolLogo: json.protocol_logo,
      position: json.position ? EvmDefiProtocolPosition.fromJSON(json.position) : undefined,
    };
    return EvmDefiPositionSummaryResponse.create(input);
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
  /**
   * @description The position of the protocol
   */
  public readonly position?: EvmDefiProtocolPosition;

  private constructor(input: EvmDefiPositionSummaryResponseInput) {
    this.protocolName = input.protocolName;
    this.protocolId = input.protocolId;
    this.protocolUrl = input.protocolUrl;
    this.protocolLogo = input.protocolLogo;
    this.position = input.position ? EvmDefiProtocolPosition.create(input.position) : undefined;
  }

  public toJSON(): EvmDefiPositionSummaryResponseJSON {
    return {
      protocol_name: this.protocolName,
      protocol_id: this.protocolId,
      protocol_url: this.protocolUrl,
      protocol_logo: this.protocolLogo,
      position: this.position ? this.position.toJSON() : undefined,
    }
  }
}
