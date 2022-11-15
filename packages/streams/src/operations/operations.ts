import {
  addAddressEvmOperation,
  createStreamEvmOperation,
  deleteAddressEvmOperation,
  deleteStreamEvmOperation,
  getAddressesEvmOperation,
  getStreamEvmOperation,
  getStreamsEvmOperation,
  updateStreamEvmOperation,
  updateStreamStatusEvmOperation,
} from './evmStreams';
import { getHistoryOperation, replayHistoryOperation } from './history';
import { getSettingsOperation, setSettingsOperation } from './project';
import { getStatsByIdOperation } from './stats';

export const operations = [
  // evmStreams
  addAddressEvmOperation,
  createStreamEvmOperation,
  deleteAddressEvmOperation,
  deleteStreamEvmOperation,
  getAddressesEvmOperation,
  getStreamEvmOperation,
  getStreamsEvmOperation,
  updateStreamEvmOperation,
  updateStreamStatusEvmOperation,

  // history
  getHistoryOperation,
  replayHistoryOperation,

  // project
  getSettingsOperation,
  setSettingsOperation,

  // stats
  getStatsByIdOperation,
];
