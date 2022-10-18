const defaultWebhookResponse = {
  id: 'string',
  date: '2022-10-12T09:23:13.895Z',
  payload: {
    block: {
      number: 'string',
      hash: 'string',
      timestamp: 'string',
    },
    chainId: 'string',
    logs: [
      {
        logIndex: 'string',
        transactionHash: 'string',
        address: 'string',
        data: 'string',
        topic0: 'string',
        topic1: 'string',
        topic2: 'string',
        topic3: 'string',
      },
    ],
    txs: [
      {
        hash: 'string',
        gas: 'string',
        gasPrice: 'string',
        nonce: 'string',
        input: 'string',
        transactionIndex: 'string',
        fromAddress: 'string',
        toAddress: 'string',
        value: 'string',
        type: 'string',
        v: 'string',
        r: 'string',
        s: 'string',
        receiptCumulativeGasUsed: 'string',
        receiptGasUsed: 'string',
        receiptContractAddress: 'string',
        receiptRoot: 'string',
        receiptStatus: 'string',
      },
    ],
    txsInternal: [
      {
        from: 'string',
        to: 'string',
        value: 'string',
        transactionHash: 'string',
        gas: 'string',
      },
    ],
    abi: [{}],
    retries: 0,
    confirmed: true,
    tag: 'string',
    streamId: 'string',
  },
  tinyPayload: {
    chainId: 'string',
    confirmed: true,
    block: 'string',
    records: 0,
    retries: 0,
  },
  errorMessage: 'string',
  webhookUrl: 'string',
  streamId: 'string',
  tag: 'string',
};

export const createWebhookResponse = (id: string) => ({
  ...defaultWebhookResponse,
  id,
});

export const createPaginatedWebhookResponse = (ids: string[], total: number, cursor?: string) => ({
  result: ids.map((id) => ({ ...defaultWebhookResponse, id })),
  total,
  cursor,
});
