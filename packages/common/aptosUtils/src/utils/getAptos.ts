import { CoreError, CoreErrorCode } from '@moralisweb3/common-core';
import * as aptos from 'aptos';

/**
 * Validates the existence of the aptos dependency, and returns it. Throws an error otherwise.
 * Use this instead of direct 'aptos' dependency for every functionality that is exposed in umbrella 'moralis' package
 * The purpose for this is to check for the existence in UMD builds, where the dependency needs to be manually included
 */
export function getAptos() {
  // aptos only has a default export, to validate the import, the only secure way (across UMD / CJS ) I found
  // Is to check if the module exports more than 1 property (it could export 'default: null')
  if (!aptos || Object.keys(aptos).length <= 1) {
    throw new CoreError({
      code: CoreErrorCode.MISSING_DEPENDENCY,
      message: 'Aptos dependency is missing, make sure to include it',
    });
  }

  return aptos;
}
