// $ref: #/components/schemas/endpointWeights

export interface AptEndpointWeightsJSON {
  readonly endpoint: string;
  readonly path: string;
  readonly rateLimitCost: string;
  readonly price: string;
}

export interface AptEndpointWeightsInput {
  readonly endpoint: string;
  readonly path: string;
  readonly rateLimitCost: string;
  readonly price: string;
}

export class AptEndpointWeights {
  public static create(input: AptEndpointWeightsInput): AptEndpointWeights {
    return new AptEndpointWeights(input);
  }

  public static fromJSON(json: AptEndpointWeightsJSON): AptEndpointWeights {
    const input: AptEndpointWeightsInput = {
      endpoint: json.endpoint,
      path: json.path,
      rateLimitCost: json.rateLimitCost,
      price: json.price,
    };
    return AptEndpointWeights.create(input);
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

  private constructor(input: AptEndpointWeightsInput) {
    this.endpoint = input.endpoint;
    this.path = input.path;
    this.rateLimitCost = input.rateLimitCost;
    this.price = input.price;
  }

  public toJSON(): AptEndpointWeightsJSON {
    return {
      endpoint: this.endpoint,
      path: this.path,
      rateLimitCost: this.rateLimitCost,
      price: this.price,
    };
  }
}
