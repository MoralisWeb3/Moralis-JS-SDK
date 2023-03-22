const defaultWebhookLogResponse = {
  streamId: 'aa1d4d4f-549a-4235-a97d-367e7909f657',
  chain: '0x1',
  webhookUrl: 'https://webhook.site/9b9a8773-2129-431d-983a-f32c89854ee7',
  tag: 'demo',
  retries: 0,
  deliveryStatus: 'failed',
  blockNumber: 16866964,
  errorMessage: 'Request failed with status code 500',
  type: 'evm',
  createdAt: '2023-03-20T06:03:27.060Z',
  updatedAt: '2023-03-20T06:03:27.060Z',
  id: 'e5578320-44a1-47c3-95d5-0ae6874157cf',
};

export const createWebhookLogResponse = (id: string) => ({
  ...defaultWebhookLogResponse,
  id,
});

export const createPaginatedWebhookLogResponse = (ids: string[], total: number, cursor?: string) => ({
  result: ids.map(createWebhookLogResponse),
  total,
  cursor,
});
