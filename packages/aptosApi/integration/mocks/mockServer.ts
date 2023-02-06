import { MOCK_API_KEY, APTOS_API_ROOT } from './config';
import { MockServer } from '@moralisweb3/test-utils';
import { mockGetAccount } from './endpoints/accounts.getAccount';

const handlers = [mockGetAccount];

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: APTOS_API_ROOT }, handlers).start();
