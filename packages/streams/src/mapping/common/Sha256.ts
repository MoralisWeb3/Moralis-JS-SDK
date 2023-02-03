import { getEthers } from "@moralisweb3/common-evm-utils";

export class Sha256 {
  public static hash(value: string): string {
    const { utils } = getEthers();
    const bytes = utils.toUtf8Bytes(value);
    return utils.sha256(bytes);
  }
}
