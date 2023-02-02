import { BigNumber } from '@ethersproject/bignumber';

import { LogParam } from './LogParser';
import { LogDocumentValue } from './LogDocumentBuilder';

export class LogDocumentValueFormatter {
  public static format(param: LogParam): LogDocumentValue {
    switch (param.type) {
      case 'string':
        return param.value as string;
      case 'address':
        return (param.value as string).toLowerCase();
      default:
        if (BigNumber.isBigNumber(param.value)) {
          return (param.value as BigNumber).toString();
        }
        return param.value.toString();
    }
  }
}
