const defaultStatsResponse = {
  totalWebhooksDelivered: 0,
  totalWebhooksFailed: 0,
  totalLogsProcessed: 2,
  totalTxsProcessed: 1,
  totalTxsInternalProcessed: 0,
};

export const statsResponse = () => ({
  ...defaultStatsResponse,
});
