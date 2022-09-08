import { setupServer } from 'msw/node';

import { mockCreateStream } from './streamApi/createStream';
import { mockDeleteStream } from './streamApi/deleteStream';
import { mockGetStreams } from './streamApi/getStreams';
import { mockUpdateStream } from './streamApi/updateStream';
import { mockSetSettings } from './streamApi/setSettings';
import { mockGetSettings } from './streamApi/getSettings';

const handlers = [
  mockCreateStream,
  mockGetStreams,
  mockUpdateStream,
  mockDeleteStream,
  mockSetSettings,
  mockGetSettings,
];

export const mockServer = setupServer(...handlers);
