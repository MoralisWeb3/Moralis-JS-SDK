import {
  addAddressEvmOperation,
  createStreamEvmOperation,
  getStreamEvmOperation,
  getStreamsEvmOperation,
} from './evmStreams';
import { getHistoryOperation, replayHistoryOperation } from './history';
import { getSettingsOperation, setSettingsOperation } from './project';
import { getStatsByIdOperation } from './stats';

export const operations = [
  addAddressEvmOperation,
  createStreamEvmOperation,
  getStreamEvmOperation,
  getStreamsEvmOperation,
  getHistoryOperation,
  replayHistoryOperation,
  getSettingsOperation,
  setSettingsOperation,
  getStatsByIdOperation,
];
