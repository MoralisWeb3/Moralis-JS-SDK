import { evmRequestChallengeOperation, evmVerifyChallengeOperation } from './evm';
import { solRequestChallengeOperation, solVerifyChallengeOperation } from './solana';

export const operations = [
  evmRequestChallengeOperation,
  evmVerifyChallengeOperation,
  solRequestChallengeOperation,
  solVerifyChallengeOperation,
];
