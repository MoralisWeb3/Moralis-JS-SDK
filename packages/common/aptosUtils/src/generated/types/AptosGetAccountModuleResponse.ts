import { AptosMoveModuleAbi, AptosMoveModuleAbiInput, AptosMoveModuleAbiJSON } from '../types/AptosMoveModuleAbi';

// $ref: #/components/schemas/GetAccountModuleResponse
// type: GetAccountModuleResponse
// properties:
// - bytecode ($ref: #/components/schemas/GetAccountModuleResponse/properties/bytecode)
// - abi ($ref: #/components/schemas/MoveModuleAbi)

export interface AptosGetAccountModuleResponseJSON {
  readonly bytecode: string;
  readonly abi: AptosMoveModuleAbiJSON;
}

export interface AptosGetAccountModuleResponseInput {
  readonly bytecode: string;
  readonly abi: AptosMoveModuleAbiInput | AptosMoveModuleAbi;
}

export class AptosGetAccountModuleResponse {
  public static create(input: AptosGetAccountModuleResponseInput | AptosGetAccountModuleResponse): AptosGetAccountModuleResponse {
    if (input instanceof AptosGetAccountModuleResponse) {
      return input;
    }
    return new AptosGetAccountModuleResponse(input);
  }

  public static fromJSON(json: AptosGetAccountModuleResponseJSON): AptosGetAccountModuleResponse {
    const input: AptosGetAccountModuleResponseInput = {
      bytecode: json.bytecode,
      abi: AptosMoveModuleAbi.fromJSON(json.abi),
    };
    return AptosGetAccountModuleResponse.create(input);
  }

  /**
   * @description 0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1
   */
  public readonly bytecode: string;
  /**
   * @description A Move module
   */
  public readonly abi: AptosMoveModuleAbi;

  private constructor(input: AptosGetAccountModuleResponseInput) {
    this.bytecode = input.bytecode;
    this.abi = AptosMoveModuleAbi.create(input.abi);
  }

  public toJSON(): AptosGetAccountModuleResponseJSON {
    return {
      bytecode: this.bytecode,
      abi: this.abi.toJSON(),
    }
  }
}
