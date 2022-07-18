import { completeChallenge } from './resolvers/completeChallenge';
import { initializeChallenge } from './resolvers/initializeChallenge';

export const AuthApi = {
  requestMessage: initializeChallenge.fetch,
  verify: completeChallenge.fetch,
};
