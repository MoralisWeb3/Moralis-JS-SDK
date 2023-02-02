import { AptosStreamInput } from './types';

const simple: AptosStreamInput = {
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'mock response',
  tag: 'tag',
  allAddresses: false,
  status: 'active',
  statusMessage: 'Stream is active',
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  network: ['mainnet'],
  demo: false,
  includeChanges: false,
  includeEvents: false,
  includePayload: false,
  isErrorSince: null,
  events: [],
  functions: [],
  amountOfAddresses: 1,
};

export const mockAptosStream = {
  SIMPLE: simple,
};
