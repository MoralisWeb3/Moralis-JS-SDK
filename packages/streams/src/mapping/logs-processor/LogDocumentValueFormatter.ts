import { LogParam } from './LogParser';
import { LogDocumentValue } from './LogDocumentBuilder';
import { type BigNumber } from 'ethers';
import { getEthers } from '@moralisweb3/common-evm-utils';

export class LogDocumentValueFormatter {
  public static format(param: LogParam): LogDocumentValue {
    switch (param.type) {
      case 'string':
        return param.value as string;
      case 'address':
        return (param.value as string).toLowerCase();
      default:
        // eslint-disable-next-line no-case-declarations -- We only care about the dependency and validation once we need to use BigNumber
        const { BigNumber } = getEthers();
        if (BigNumber.isBigNumber(param.value)) {
          return (param.value as BigNumber).toString();
        }
        return param.value.toString();
    }
  }
}
