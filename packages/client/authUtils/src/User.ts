import { NetworkType } from '@moralisweb3/client-backend-adapter-utils';

/**
 * @description Connected or authenticated user.
 */
export interface User {
  /**
   * @description Network type.
   * @example "evm"
   * @example "solana"
   */
  networkType: NetworkType;

  /**
   * @description Address of a user's wallet.
   * @example "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
   * @example "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
   */
  address: string;

  /**
   * @description `true` - if a user is authenticated, if only connected then `false`.
   */
  isAuthenticated: boolean;

  /**
   * @description Profile id of an authenticated user. If a user is only connected and not authenticated, this field is empty.
   */
  profileId?: string;
}
