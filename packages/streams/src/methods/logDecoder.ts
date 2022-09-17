import { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import AbiUtils from 'web3-eth-abi';
import {
  isWebhook,
  hasAbis,
  getTagStream,
  getTagLogs,
  isContractLog,
  ContractLog,
  isNotEmpty,
} from '../utils/logDecoderUtils';

export interface DecodeLogOptions {
  webhookData: unknown;
  tag: string;
}

export const decodeLog = <Event>({ webhookData, tag }: DecodeLogOptions) => {
  if (!isWebhook(webhookData)) {
    throw new MoralisStreamError({
      code: StreamErrorCode.GENERIC_STREAM_ERROR,
      message: 'Cannot decode the logs. No logs found in the webhook, or invalid webhook provided.',
    });
  }

  if (!hasAbis(webhookData)) {
    throw new MoralisStreamError({
      code: StreamErrorCode.GENERIC_STREAM_ERROR,
      message: 'Cannot decode the logs. No abis found in the provided webhook.',
    });
  }

  const streamId = getTagStream(webhookData, tag);

  if (!streamId) {
    throw new MoralisStreamError({
      code: StreamErrorCode.GENERIC_STREAM_ERROR,
      message: `Cannot decode the logs. No stream found for tag ${tag}.`,
    });
  }

  if (!webhookData.abis[streamId]) {
    throw new MoralisStreamError({
      code: StreamErrorCode.GENERIC_STREAM_ERROR,
      message: `Cannot decode the logs. No abi found  for ${streamId}.`,
    });
  }

  const logs = getTagLogs(webhookData, tag);

  const decodedLogs: Event[] = [];

  logs.forEach((currentLog) => {
    if (!isContractLog(currentLog, webhookData)) {
      return;
    }
    const { data, topic1, topic2, topic3 } = currentLog as ContractLog;
    const topics = [topic1, topic2, topic3].filter(isNotEmpty);
    const abi = webhookData.abis?.[currentLog.streamId];
    const decodedLog = AbiUtils.decodeLog(abi.inputs, data, topics) as unknown as Event;
    decodedLogs.push(decodedLog);
  });

  return decodedLogs;
};
