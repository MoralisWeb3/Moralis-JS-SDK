import { CoreError, CoreErrorCode } from '@moralisweb3/common-core';
import * as solanaWeb3 from '@solana/web3.js';

/**
 * Validates the existence of the @solana/web3.js dependency, and returns it. Throws an error otherwise.
 * Use this instead of direct '@solana/web3.js' dependency for every functionality that is exposed in umbrella 'moralis' package
 * The purpose for this is to check for the existence in UMD builds, where the dependency needs to be manually included
 */
export function getSolanaWeb3() {
  // @solana/web3 only has a default export, to validate the import, the only secure way (across UMD / CJS ) I found
  // Is to check if the module exports more than 1 property (it could export 'default: null')
  if (!solanaWeb3 || Object.keys(solanaWeb3).length <= 1) {
    throw new CoreError({
      code: CoreErrorCode.MISSING_DEPENDENCY,
      message: '@solana/web3.js dependency is missing, make sure to include it',
    });
  }

  return solanaWeb3
}
