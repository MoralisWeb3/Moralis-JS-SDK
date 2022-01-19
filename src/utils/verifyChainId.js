import { fromDecimalToHex } from './convert';

/**
 * Converts chainId to a hex if it is a number
 */
function verifyChainId(chainId) {
  if (typeof chainId === 'number') chainId = fromDecimalToHex(chainId);
  return chainId;
}

export default verifyChainId;
