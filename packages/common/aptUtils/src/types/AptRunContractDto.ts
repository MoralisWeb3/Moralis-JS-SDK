import { AptRunContractDtoAbiItem, AptRunContractDtoAbiItemJSON } from '../types/AptRunContractDtoAbiItem';
import { AptRunContractDtoParams, AptRunContractDtoParamsJSON } from '../types/AptRunContractDtoParams';

// $ref: #/components/schemas/RunContractDto

export interface AptRunContractDtoJSON {
  readonly abi: AptRunContractDtoAbiItemJSON[];
  readonly params?: AptRunContractDtoParamsJSON;
}

export interface AptRunContractDtoInput {
  readonly abi: AptRunContractDtoAbiItem[];
  readonly params?: AptRunContractDtoParams;
}

export class AptRunContractDto {
  public static create(input: AptRunContractDtoInput): AptRunContractDto {
    return new AptRunContractDto(input);
  }

  public static fromJSON(json: AptRunContractDtoJSON): AptRunContractDto {
    const input: AptRunContractDtoInput = {
      abi: json.abi.map((item) => AptRunContractDtoAbiItem.fromJSON(item)),
      params: json.params ? AptRunContractDtoParams.fromJSON(json.params) : undefined,
    };
    return AptRunContractDto.create(input);
  }

  /**
   * @description The contract ABI
   */
  public readonly abi: AptRunContractDtoAbiItem[];
  /**
   * @description The params for the given function
   */
  public readonly params?: AptRunContractDtoParams;

  private constructor(input: AptRunContractDtoInput) {
    this.abi = input.abi;
    this.params = input.params;
  }

  public toJSON(): AptRunContractDtoJSON {
    return {
      abi: this.abi.map((item) => item.toJSON()),
      params: this.params ? this.params.toJSON() : undefined,
    };
  }
}
