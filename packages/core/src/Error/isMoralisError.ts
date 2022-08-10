import { MoralisError } from './MoralisError';

export const isMoralisError = (error: unknown): error is MoralisError => {
  if (!(error instanceof Error)) {
    return false;
  }
  if (!(error as MoralisError).isMoralisError) {
    return false;
  }

  return true;
};
