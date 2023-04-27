import Moralis from 'moralis';

interface StreamTriggerOptions {
  type: 'tx' | 'log' | 'erc20transfer' | 'erc20approval' | 'nfttransfer';
  contractAddress: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  functionAbi: any;
  inputs?: string[];
}

interface StreamOptions {
  networkType: 'evm';
  webhookUrl: string;
  triggers: StreamTriggerOptions[];
}

const DESCRIPTION = 'some description';
const TAG = 'transactions';
const CHAINIDS = ['0x3', '0x4'];

export async function addStream(options: StreamOptions) {
  const { networkType, webhookUrl, triggers } = options;
  const result = await Moralis.Streams.add({
    networkType,
    webhookUrl,
    chains: CHAINIDS,
    tag: TAG,
    description: DESCRIPTION,
    includeNativeTxs: true,
    triggers,
  });

  return result.raw;
}

export async function getStreams() {
  const result = await Moralis.Streams.getAll({
    limit: 20,
    networkType: 'evm',
  });

  return result.raw;
}

export async function deleteStream(id: string) {
  const result = await Moralis.Streams.delete({
    id,
    networkType: 'evm',
  });

  return result.raw;
}

export async function updateStream(id: string, options: StreamOptions) {
  const { networkType, webhookUrl, triggers } = options;
  const result = await Moralis.Streams.update({
    id,
    networkType,
    webhookUrl,
    chains: CHAINIDS,
    tag: TAG,
    description: DESCRIPTION,
    includeNativeTxs: true,
    triggers,
  });

  return result.raw;
}

export async function setSettings({
  region,
}: {
  region: 'us-east-1' | 'us-west-2' | 'eu-central-1' | 'ap-southeast-1';
}) {
  const result = await Moralis.Streams.setSettings({
    region,
  });

  return result.raw;
}
