import { MockServer } from '@moralisweb3/test-utils';
import { STREAM_API_ROOT, MOCK_API_KEY } from './config';
import { mockAddAddressEvm } from './endpoints/addAddress';
import { mockCreateStream } from './endpoints/createStream';
import { mockDeleteAddressEvm } from './endpoints/deleteAddress';
import { mockDeleteStream } from './endpoints/deleteStream';
import { mockGetAddressesEvm } from './endpoints/getAddresses';
import { mockGetHistory } from './endpoints/getHistory';
import { mockGetSettings } from './endpoints/getSettings';
import { mockGetStats } from './endpoints/getStats';
import { mockGetStatsById } from './endpoints/getStatsById';
import { mockGetStreams } from './endpoints/getStreams';
import { mockReplayHistory } from './endpoints/replayHistory';
import { mockSetSettings } from './endpoints/setSettings';
import { mockUpdateStream } from './endpoints/updateStream';

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: STREAM_API_ROOT }, [
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
  mockGetStats,
  mockGetStatsById
]).start();
