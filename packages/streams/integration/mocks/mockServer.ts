import { MockServer } from '@moralisweb3/test-utils';
import { STREAM_API_ROOT, MOCK_API_KEY } from './config';
import { mockAddAddressEvm } from './endpoints/evm/addAddress';
import { mockCreateStreamEvm } from './endpoints/evm/createStream';
import { mockDeleteAddressEvm } from './endpoints/evm/deleteAddress';
import { mockDeleteStreamEvm } from './endpoints/evm/deleteStream';
import { mockGetAddressesEvm } from './endpoints/evm/getAddresses';
import { mockGetHistory } from './endpoints/getHistory';
import { mockGetSettings } from './endpoints/getSettings';
import { mockGetStats } from './endpoints/getStats';
import { mockGetStatsById } from './endpoints/getStatsById';
import { mockGetStreamsEvm } from './endpoints/evm/getStreams';
import { mockReplayHistory } from './endpoints/replayHistory';
import { mockSetSettings } from './endpoints/setSettings';
import { mockUpdateStreamEvm } from './endpoints/evm/updateStream';
import { mockAddAddressAptos } from './endpoints/aptos/addAddress';
import { mockCreateStreamAptos } from './endpoints/aptos/createStream';
import { mockDeleteAddressAptos } from './endpoints/aptos/deleteAddress';
import { mockDeleteStreamAptos } from './endpoints/aptos/deleteStream';
import { mockGetAddressesAptos } from './endpoints/aptos/getAddresses';
import { mockGetStreamsAptos } from './endpoints/aptos/getStreams';
import { mockUpdateStreamAptos } from './endpoints/aptos/updateStream';

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: STREAM_API_ROOT }, [
  mockAddAddressEvm,
  mockDeleteAddressEvm,
  mockCreateStreamEvm,
  mockDeleteStreamEvm,
  mockGetAddressesEvm,
  mockGetStreamsEvm,
  mockGetSettings,
  mockSetSettings,
  mockUpdateStreamEvm,
  mockReplayHistory,
  mockGetHistory,
  mockGetStats,
  mockGetStatsById,
  mockGetAddressesAptos,
  mockAddAddressAptos,
  mockCreateStreamAptos,
  mockDeleteAddressAptos,
  mockDeleteStreamAptos,
  mockGetStreamsAptos,
  mockUpdateStreamAptos,
]).start();
