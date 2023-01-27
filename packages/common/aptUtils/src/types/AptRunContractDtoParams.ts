// $ref: #/components/schemas/RunContractDto/properties/params

export type AptRunContractDtoParamsJSON = object;
export type AptRunContractDtoParamsInput = AptRunContractDtoParamsJSON;

export class AptRunContractDtoParams {
  public static create(input: AptRunContractDtoParamsInput) {
    return new AptRunContractDtoParams(input);
  }

  public static fromJSON(json: AptRunContractDtoParamsJSON) {
    return new AptRunContractDtoParams(json);
  }

  public constructor(public readonly value: AptRunContractDtoParamsInput) {}

  public toJSON(): AptRunContractDtoParamsJSON {
    return this.value;
  }
}
