// $ref: #/components/schemas/RunContractDto/properties/abi/items

export type AptRunContractDtoAbiItemJSON = object;
export type AptRunContractDtoAbiItemInput = AptRunContractDtoAbiItemJSON;

export class AptRunContractDtoAbiItem {
  public static create(input: AptRunContractDtoAbiItemInput) {
    return new AptRunContractDtoAbiItem(input);
  }

  public static fromJSON(json: AptRunContractDtoAbiItemJSON) {
    return new AptRunContractDtoAbiItem(json);
  }

  public constructor(public readonly value: AptRunContractDtoAbiItemInput) {}

  public toJSON(): AptRunContractDtoAbiItemJSON {
    return this.value;
  }
}
