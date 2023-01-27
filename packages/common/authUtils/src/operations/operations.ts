import {
  getAddressesOperation,
  removeBindOperation,
  requestBindOperation,
  requestChallengeEvmOperation,
  verifyChallengeEvmOperation,
  verifyRemoveBindOperation,
  verifyRequestBindOperation,
} from './evm';
import { requestChallengeSolanaOperation, verifyChallengeSolanaOperation } from './solana';

export const operations = [
  requestChallengeSolanaOperation,
  requestChallengeEvmOperation,
  verifyChallengeSolanaOperation,
  verifyChallengeEvmOperation,
  getAddressesOperation,
  removeBindOperation,
  requestBindOperation,
  verifyRemoveBindOperation,
  verifyRequestBindOperation,
];
