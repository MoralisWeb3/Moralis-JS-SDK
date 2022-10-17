const defaultMockStream = {
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'mock response',
  tag: 'tag',
  topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  allAddresses: false,
  includeNativeTxs: false,
  includeContractLogs: false,
  includeInternalTxs: false,
  abi: null,
  filter: null,
  chainIds: ['0x3', '0x4'],
  status: 'active',
  statusMessage: 'Stream is active',
};

export const createStreamResponse = (tag: string) => ({
  ...defaultMockStream,
  tag,
});

export const createPaginatedStreamResponse = (tags: string[], total: number, cursor?: string) => ({
  result: tags.map((tag) => ({ ...defaultMockStream, tag })),
  total,
  cursor,
});
