import { EvmContractTokenDetails, EvmContractTokenDetailsInput, EvmContractTokenDetailsJSON } from '../types/EvmContractTokenDetails';
import { EvmContractSpenderDetails, EvmContractSpenderDetailsInput, EvmContractSpenderDetailsJSON } from '../types/EvmContractSpenderDetails';

// $ref: #/components/schemas/CommonContractData
// type: CommonContractData
// properties:
// - value ($ref: #/components/schemas/CommonContractData/properties/value)
// - value_formatted ($ref: #/components/schemas/CommonContractData/properties/value_formatted)
// - token ($ref: #/components/schemas/ContractTokenDetails)
// - spender ($ref: #/components/schemas/ContractSpenderDetails)

export interface EvmCommonContractDataJSON {
  readonly value: string;
  readonly value_formatted?: string;
  readonly token: EvmContractTokenDetailsJSON;
  readonly spender: EvmContractSpenderDetailsJSON;
}

export interface EvmCommonContractDataInput {
  readonly value: string;
  readonly valueFormatted?: string;
  readonly token: EvmContractTokenDetailsInput | EvmContractTokenDetails;
  readonly spender: EvmContractSpenderDetailsInput | EvmContractSpenderDetails;
}

export class EvmCommonContractData {
  public static create(input: EvmCommonContractDataInput | EvmCommonContractData): EvmCommonContractData {
    if (input instanceof EvmCommonContractData) {
      return input;
    }
    return new EvmCommonContractData(input);
  }

  public static fromJSON(json: EvmCommonContractDataJSON): EvmCommonContractData {
    const input: EvmCommonContractDataInput = {
      value: json.value,
      valueFormatted: json.value_formatted,
      token: EvmContractTokenDetails.fromJSON(json.token),
      spender: EvmContractSpenderDetails.fromJSON(json.spender),
    };
    return EvmCommonContractData.create(input);
  }

  public readonly value: string;
  public readonly valueFormatted?: string;
  public readonly token: EvmContractTokenDetails;
  public readonly spender: EvmContractSpenderDetails;

  private constructor(input: EvmCommonContractDataInput) {
    this.value = input.value;
    this.valueFormatted = input.valueFormatted;
    this.token = EvmContractTokenDetails.create(input.token);
    this.spender = EvmContractSpenderDetails.create(input.spender);
  }

  public toJSON(): EvmCommonContractDataJSON {
    return {
      value: this.value,
      value_formatted: this.valueFormatted,
      token: this.token.toJSON(),
      spender: this.spender.toJSON(),
    }
  }
}
