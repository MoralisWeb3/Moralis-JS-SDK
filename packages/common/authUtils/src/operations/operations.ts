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
import { requestChallengeAptosOperation, verifyChallengeAptosOperation } from './aptos';

export const operations = [
  requestChallengeSolanaOperation,
  requestChallengeEvmOperation,
  requestChallengeAptosOperation,
  verifyChallengeSolanaOperation,
  verifyChallengeEvmOperation,
  verifyChallengeAptosOperation,
  getAddressesOperation,
  removeBindOperation,
  requestBindOperation,
  verifyRemoveBindOperation,
  verifyRequestBindOperation,
];
