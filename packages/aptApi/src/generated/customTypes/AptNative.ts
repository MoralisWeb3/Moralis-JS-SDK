import { BigNumber } from "@moralisweb3/common-core";

export type AptNativeJSON = string;
export type AptNativeInput = AptNativeJSON;

export class AptNative {
  public static create(input: AptNativeInput | AptNative): AptNative {
    if (input instanceof AptNative) {
      return input;
    }
    return new AptNative(BigNumber.create(input));
  }

  public static fromJSON(json: AptNativeJSON): AptNative {
    return new AptNative(BigNumber.create(json));
  }

  private constructor(
    public readonly value: BigNumber
  ) {
  }

  public toJSON(): AptNativeJSON {
    return this.value.toJSON();
  }
}
