import { EvmCommonContractData, EvmCommonContractDataInput, EvmCommonContractDataJSON } from '../types/EvmCommonContractData';

// $ref: #/components/schemas/ResolveContractInteractionResponse
// type: ResolveContractInteractionResponse
// properties:
// - approvals ($ref: #/components/schemas/CommonContractData)
// - revokes ($ref: #/components/schemas/CommonContractData)
// - approvalsAll ($ref: #/components/schemas/CommonContractData)
// - revokesAll ($ref: #/components/schemas/CommonContractData)

export interface EvmResolveContractInteractionResponseJSON {
  readonly approvals?: EvmCommonContractDataJSON[];
  readonly revokes?: EvmCommonContractDataJSON[];
  readonly approvalsAll?: EvmCommonContractDataJSON[];
  readonly revokesAll?: EvmCommonContractDataJSON[];
}

export interface EvmResolveContractInteractionResponseInput {
  readonly approvals?: EvmCommonContractDataInput[] | EvmCommonContractData[];
  readonly revokes?: EvmCommonContractDataInput[] | EvmCommonContractData[];
  readonly approvalsAll?: EvmCommonContractDataInput[] | EvmCommonContractData[];
  readonly revokesAll?: EvmCommonContractDataInput[] | EvmCommonContractData[];
}

export class EvmResolveContractInteractionResponse {
  public static create(input: EvmResolveContractInteractionResponseInput | EvmResolveContractInteractionResponse): EvmResolveContractInteractionResponse {
    if (input instanceof EvmResolveContractInteractionResponse) {
      return input;
    }
    return new EvmResolveContractInteractionResponse(input);
  }

  public static fromJSON(json: EvmResolveContractInteractionResponseJSON): EvmResolveContractInteractionResponse {
    const input: EvmResolveContractInteractionResponseInput = {
      approvals: json.approvals ? json.approvals.map((item) => EvmCommonContractData.fromJSON(item)) : undefined,
      revokes: json.revokes ? json.revokes.map((item) => EvmCommonContractData.fromJSON(item)) : undefined,
      approvalsAll: json.approvalsAll ? json.approvalsAll.map((item) => EvmCommonContractData.fromJSON(item)) : undefined,
      revokesAll: json.revokesAll ? json.revokesAll.map((item) => EvmCommonContractData.fromJSON(item)) : undefined,
    };
    return EvmResolveContractInteractionResponse.create(input);
  }

  public readonly approvals?: EvmCommonContractData[];
  public readonly revokes?: EvmCommonContractData[];
  public readonly approvalsAll?: EvmCommonContractData[];
  public readonly revokesAll?: EvmCommonContractData[];

  private constructor(input: EvmResolveContractInteractionResponseInput) {
    this.approvals = input.approvals ? input.approvals.map((item) => EvmCommonContractData.create(item)) : undefined;
    this.revokes = input.revokes ? input.revokes.map((item) => EvmCommonContractData.create(item)) : undefined;
    this.approvalsAll = input.approvalsAll ? input.approvalsAll.map((item) => EvmCommonContractData.create(item)) : undefined;
    this.revokesAll = input.revokesAll ? input.revokesAll.map((item) => EvmCommonContractData.create(item)) : undefined;
  }

  public toJSON(): EvmResolveContractInteractionResponseJSON {
    return {
      approvals: this.approvals ? this.approvals.map((item) => item.toJSON()) : undefined,
      revokes: this.revokes ? this.revokes.map((item) => item.toJSON()) : undefined,
      approvalsAll: this.approvalsAll ? this.approvalsAll.map((item) => item.toJSON()) : undefined,
      revokesAll: this.revokesAll ? this.revokesAll.map((item) => item.toJSON()) : undefined,
    }
  }
}
