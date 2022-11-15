import { requestChallengeEvmOperation, verifyChallengeEvmOperation } from './evm';
import { requestChallengeSolanaOperation, verifyChallengeSolanaOperation } from './solana';

export const operations = [
  requestChallengeSolanaOperation,
  requestChallengeEvmOperation,
  verifyChallengeSolanaOperation,
  verifyChallengeEvmOperation,
];
