// $ref: #/components/schemas/unstoppableDomain
// type: unstoppableDomain
// properties:
// - name ($ref: #/components/schemas/unstoppableDomain/properties/name)

export interface EvmUnstoppableDomainJSON {
  readonly name: string;
}

export interface EvmUnstoppableDomainInput {
  readonly name: string;
}

export class EvmUnstoppableDomain {
  public static create(input: EvmUnstoppableDomainInput | EvmUnstoppableDomain): EvmUnstoppableDomain {
    if (input instanceof EvmUnstoppableDomain) {
      return input;
    }
    return new EvmUnstoppableDomain(input);
  }

  public static fromJSON(json: EvmUnstoppableDomainJSON): EvmUnstoppableDomain {
    const input: EvmUnstoppableDomainInput = {
      name: json.name,
    };
    return EvmUnstoppableDomain.create(input);
  }

  /**
   * @description Resolved unstoppable domain address
   */
  public readonly name: string;

  private constructor(input: EvmUnstoppableDomainInput) {
    this.name = input.name;
  }

  public toJSON(): EvmUnstoppableDomainJSON {
    return {
      name: this.name,
    }
  }
}
