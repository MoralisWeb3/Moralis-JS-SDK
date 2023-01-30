export type EvmChainJSON = string;
export type EvmChainInput = EvmChainJSON;

export class EvmChain {
  public static ETHEREUM = EvmChain.create('0x1');
  public static GOERLI = EvmChain.create('0x5');

  public static create(input: EvmChainInput | EvmChain): EvmChain {
    if (input instanceof EvmChain) {
      return input;
    }
    return new EvmChain(input);
  }

  public static fromJSON(json: EvmChainJSON): EvmChain {
    return new EvmChain(json);
  }

  private constructor(
    public readonly address: string
  ) {
  }

  public toJSON(): EvmChainJSON {
    return this.address;
  }
}
