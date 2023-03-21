const defaultMockStream = {
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'mock response',
  tag: 'tag',
  topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  allAddresses: false,
  includeNativeTxs: false,
  includeContractLogs: false,
  includeInternalTxs: false,
  includeAllTxLogs: false,
  abi: null,
  chainIds: ['0x3', '0x4'],
  status: 'active',
  statusMessage: 'Stream is active',
  advancedOptions: null,
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
};

export const createEvmStreamResponse = (tag: string) => ({
  ...defaultMockStream,
  tag,
});

export const createPaginatedEvmStreamResponse = (tags: string[], total: number, cursor?: string) => ({
  result: tags.map((tag) => ({ ...defaultMockStream, tag })),
  total,
  cursor,
});
