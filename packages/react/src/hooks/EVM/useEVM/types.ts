import { EvmConnectData } from '@moralisweb3/core';
import { IStandardCallbacks } from '../../types';

export interface IEVMConnect extends IStandardCallbacks {
  onSuccess?: (web3: EvmConnectData) => void;
}
