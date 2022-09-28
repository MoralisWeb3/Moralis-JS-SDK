import { setupServer } from 'msw/node';

import { mockCreateStream } from './streamApi/createStream';
import { mockDeleteStream } from './streamApi/deleteStream';
import { mockGetStreams } from './streamApi/getStreams';
import { mockUpdateStream } from './streamApi/updateStream';
import { mockSetSettings } from './streamApi/setSettings';
import { mockGetSettings } from './streamApi/getSettings';
import { mockAddAddressEvm } from './streamApi/addAddress';
import { mockDeleteAddressEvm } from './streamApi/deleteAddress';
import { mockGetAddressesEvm } from './streamApi/getAddresses';

const handlers = [
  mockCreateStream,
  mockGetStreams,
  mockUpdateStream,
  mockDeleteStream,
  mockSetSettings,
  mockGetSettings,
  mockAddAddressEvm,
  mockDeleteAddressEvm,
  mockGetAddressesEvm,
];

export const mockServer = setupServer(...handlers);
