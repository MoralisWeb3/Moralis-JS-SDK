// $ref: #/components/schemas/endpointWeights
// type: endpointWeights
// properties:
// - endpoint ($ref: #/components/schemas/endpointWeights/properties/endpoint)
// - path ($ref: #/components/schemas/endpointWeights/properties/path)
// - rateLimitCost ($ref: #/components/schemas/endpointWeights/properties/rateLimitCost)
// - price ($ref: #/components/schemas/endpointWeights/properties/price)

export interface EvmEndpointWeightsJSON {
  readonly endpoint: string;
  readonly path: string;
  readonly rateLimitCost: string;
  readonly price: string;
}

export interface EvmEndpointWeightsInput {
  readonly endpoint: string;
  readonly path: string;
  readonly rateLimitCost: string;
  readonly price: string;
}

export class EvmEndpointWeights {
  public static create(input: EvmEndpointWeightsInput | EvmEndpointWeights): EvmEndpointWeights {
    if (input instanceof EvmEndpointWeights) {
      return input;
    }
    return new EvmEndpointWeights(input);
  }

  public static fromJSON(json: EvmEndpointWeightsJSON): EvmEndpointWeights {
    const input: EvmEndpointWeightsInput = {
      endpoint: json.endpoint,
      path: json.path,
      rateLimitCost: json.rateLimitCost,
      price: json.price,
    };
    return EvmEndpointWeights.create(input);
  }

  /**
   * @description endpoint
   */
  public readonly endpoint: string;
  /**
   * @description The path to the endpoint
   */
  public readonly path: string;
  /**
   * @description The number of hits the request counts towards rate limiting
   */
  public readonly rateLimitCost: string;
  /**
   * @description The number of compute units the request counts towards billing
   */
  public readonly price: string;

  private constructor(input: EvmEndpointWeightsInput) {
    this.endpoint = input.endpoint;
    this.path = input.path;
    this.rateLimitCost = input.rateLimitCost;
    this.price = input.price;
  }

  public toJSON(): EvmEndpointWeightsJSON {
    return {
      endpoint: this.endpoint,
      path: this.path,
      rateLimitCost: this.rateLimitCost,
      price: this.price,
    }
  }
}
