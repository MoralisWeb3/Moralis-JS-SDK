import { MockServer } from '../MockServer';
import { STREAM_API_ROOT } from './config';
import { mockAddAddressEvm } from './streamApi/addAddress';
import { mockCreateStream } from './streamApi/createStream';
import { mockDeleteAddressEvm } from './streamApi/deleteAddress';
import { mockDeleteStream } from './streamApi/deleteStream';
import { mockGetAddressesEvm } from './streamApi/getAddresses';
import { mockGetHistory } from './streamApi/getHistory';
import { mockGetSettings } from './streamApi/getSettings';
import { mockGetStreams } from './streamApi/getStreams';
import { mockReplayHistory } from './streamApi/replayHistory';
import { mockSetSettings } from './streamApi/setSettings';
import { mockUpdateStream } from './streamApi/updateStream';

export const streamServer = MockServer.create({ apiRoot: STREAM_API_ROOT }, [
  mockAddAddressEvm,
  mockDeleteAddressEvm,
  mockCreateStream,
  mockDeleteStream,
  mockGetAddressesEvm,
  mockGetStreams,
  mockGetSettings,
  mockSetSettings,
  mockUpdateStream,
  mockReplayHistory,
  mockGetHistory,
]).start();
