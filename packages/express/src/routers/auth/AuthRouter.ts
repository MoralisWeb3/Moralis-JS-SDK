/* eslint-disable @typescript-eslint/no-explicit-any */
import { CookieOptions, Router } from 'express';
import {
  authRequestChallengeSolanaResolver,
  authRequestChallengeEvmResolver,
  authVerifyChallengeSolanaResolver,
  authVerifyChallengeEvmResolver,
} from './resolvers';
import { RequestChallengeEvmRequest, RequestChallengeSolanaRequest } from 'moralis/common-auth-utils';

export interface AuthConfig {
  challenge: Omit<RequestChallengeEvmRequest | RequestChallengeSolanaRequest, 'address' | 'chainId'>;
  /**
   * if secret is set session, JWT httpOnly cookie will be sent to client-side after verify operations
   */
  secret?: string;
  cookie?: Omit<CookieOptions, 'expires' | 'maxAge'>;
  /**
   * Expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms).
   * @example 3600, "2 days", "10h", "7d"
   * @default "30 days"

   */
  sessionMaxAge?: string;
}

export class AuthRouter {
  public static Router(config: AuthConfig) {
    const router = Router();

    router.post('/challenge/request/solana', (req: any, res, next) =>
      authRequestChallengeSolanaResolver(req, res, next, config),
    );
    router.post('/challenge/request/evm', (req: any, res, next) =>
      authRequestChallengeEvmResolver(req, res, next, config),
    );
    router.post('/challenge/verify/solana', (req: any, res, next) =>
      authVerifyChallengeSolanaResolver(req, res, next, config),
    );
    router.post('/challenge/verify/evm', (req: any, res, next) =>
      authVerifyChallengeEvmResolver(req, res, next, config),
    );

    return router;
  }
}
