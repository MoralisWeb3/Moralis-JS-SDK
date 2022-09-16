export interface AnyWebhookLog {
  streamId: string;
  tag: string;
  streamType: string;
}

export interface ContractLog extends AnyWebhookLog {
  data: string;
  topic1: string | null;
  topic2: string | null;
  topic3: string | null;
}

export interface AnyAbi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs: any[];
}

export interface AnyWebhookData {
  logs: AnyWebhookLog[];
  abis?: Record<string, AnyAbi>;
  chainId: string;
}

export interface ContractWebhookData extends AnyWebhookData {
  abis: Record<string, AnyAbi>;
}

export const isContractLog = <Log extends AnyWebhookLog>(log: Log, webhookData: AnyWebhookData) => {
  if (!webhookData.abis || !webhookData.abis[log.streamId]) {
    return false;
  }

  return true;
};

export const hasAbis = (webhookData: AnyWebhookData | ContractWebhookData): webhookData is ContractWebhookData => {
  if (!webhookData.abis) {
    return false;
  }

  return true;
};

export const getTagStream = (webhookData: AnyWebhookData | ContractWebhookData, tag: string) =>
  webhookData.logs.find((log) => log.tag === tag)?.streamId;

export const getTagLogs = (webhookData: AnyWebhookData | ContractWebhookData, tag: string) =>
  webhookData.logs.filter((log) => log.tag === tag);

export const isWebhook = (webhookData: unknown): webhookData is AnyWebhookData => {
  if (typeof webhookData !== 'object' || webhookData === null || !('logs' in webhookData)) {
    return false;
  }

  return true;
};

export const isNotEmpty = <Value>(value: Value | null): value is Value => value !== null && value !== undefined;
