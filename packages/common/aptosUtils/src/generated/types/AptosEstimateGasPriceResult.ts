// $ref: #/components/schemas/EstimateGasPriceResult
// type: EstimateGasPriceResult
// properties:
// - deprioritized_gas_estimate ($ref: #/components/schemas/EstimateGasPriceResult/properties/deprioritized_gas_estimate)
// - gas_estimate ($ref: #/components/schemas/EstimateGasPriceResult/properties/gas_estimate)
// - prioritized_gas_estimate ($ref: #/components/schemas/EstimateGasPriceResult/properties/prioritized_gas_estimate)

export interface AptosEstimateGasPriceResultJSON {
  readonly deprioritized_gas_estimate: number;
  readonly gas_estimate: number;
  readonly prioritized_gas_estimate: number;
}

export interface AptosEstimateGasPriceResultInput {
  readonly deprioritizedGasEstimate: number;
  readonly gasEstimate: number;
  readonly prioritizedGasEstimate: number;
}

export class AptosEstimateGasPriceResult {
  public static create(input: AptosEstimateGasPriceResultInput | AptosEstimateGasPriceResult): AptosEstimateGasPriceResult {
    if (input instanceof AptosEstimateGasPriceResult) {
      return input;
    }
    return new AptosEstimateGasPriceResult(input);
  }

  public static fromJSON(json: AptosEstimateGasPriceResultJSON): AptosEstimateGasPriceResult {
    const input: AptosEstimateGasPriceResultInput = {
      deprioritizedGasEstimate: json.deprioritized_gas_estimate,
      gasEstimate: json.gas_estimate,
      prioritizedGasEstimate: json.prioritized_gas_estimate,
    };
    return AptosEstimateGasPriceResult.create(input);
  }

  /**
   * @description The deprioritized estimate for the gas unit price
   */
  public readonly deprioritizedGasEstimate: number;
  /**
   * @description The current estimate for the gas unit price
   */
  public readonly gasEstimate: number;
  /**
   * @description The prioritized estimate for the gas unit price
   */
  public readonly prioritizedGasEstimate: number;

  private constructor(input: AptosEstimateGasPriceResultInput) {
    this.deprioritizedGasEstimate = input.deprioritizedGasEstimate;
    this.gasEstimate = input.gasEstimate;
    this.prioritizedGasEstimate = input.prioritizedGasEstimate;
  }

  public toJSON(): AptosEstimateGasPriceResultJSON {
    return {
      deprioritized_gas_estimate: this.deprioritizedGasEstimate,
      gas_estimate: this.gasEstimate,
      prioritized_gas_estimate: this.prioritizedGasEstimate,
    }
  }
}
