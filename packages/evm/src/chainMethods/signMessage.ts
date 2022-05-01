import { ethers } from 'ethers';
import { assertProvider } from '../assert/assertProvider';

// TODO: error catching?
export const makeSignMessage = (_provider: ethers.providers.JsonRpcSigner | null) => async (message: string) => {
  const provider = assertProvider(_provider);
  const signature = await provider.signMessage(message);

  return signature;
};
