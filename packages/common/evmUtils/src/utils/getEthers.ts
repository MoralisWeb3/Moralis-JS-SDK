import { CoreError, CoreErrorCode } from '@moralisweb3/common-core';
import { ethers } from 'ethers';

/**
 * Validates the existence of the ethers dependency, and returns it. Throws an error otherwise.
 * Use this instead of direct 'ethers' dependency for every functionality that is exposed in umbrella 'moralis' package
 * The purpose for this is to check for the existence in UMD builds, where the dependency needs to be manually included
 */
export function getEthers() {
  if (!ethers) {
    throw new CoreError({
      code: CoreErrorCode.MISSING_DEPENDENCY,
      message: 'Ethers dependency is missing, make sure to include it',
    });
  }

  return ethers;
}
