import { CoreErrorCode, MoralisError } from 'moralis/common-core';

export class NoHookParamsError extends MoralisError {
  constructor(hookName: string) {
    super({
      code: CoreErrorCode.GENERIC_CORE_ERROR,
      message: `No params provided for the ${hookName}() hook. Please check the Hook Usage Examples guide https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/packages/next#-hook-usage-example`,
    });
  }
}
