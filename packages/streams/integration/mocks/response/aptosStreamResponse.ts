const defaultMockStream = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  allAddresses: false,
  demo: true,
  description: 'mock response',
  includeChanges: true,
  includeEvents: true,
  includePayload: false,
  network: ['mainnet', 'devnet'],
  events: [],
  functions: [],
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  status: 'paused',
  statusMessage: 'Stream was paused by the user',
  tag: 'demo',
};

export const createAptosStreamResponse = (tag: string) => ({
  ...defaultMockStream,
  tag,
});

export const createPaginatedAptosStreamResponse = (tags: string[], total: number) => ({
  result: tags.map((tag) => ({ ...defaultMockStream, tag })),
  total,
});
