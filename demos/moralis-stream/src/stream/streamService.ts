import Moralis from 'moralis';

interface StreamOptions {
  networkType: 'evm';
  webhookUrl: string;
}

const DESCRIPTION = 'some description';
const TAG = 'transactions';
const CHAINIDS = ['0x3', '0x4'];

export async function addStream(options: StreamOptions) {
  const { networkType, webhookUrl } = options;
  const result = await Moralis.Streams.add({
    networkType,
    webhookUrl,
    chains: CHAINIDS,
    tag: TAG,
    description: DESCRIPTION,
    includeNativeTxs: true,
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
  const { networkType, webhookUrl } = options;
  const result = await Moralis.Streams.update({
    id,
    networkType,
    webhookUrl,
    chains: CHAINIDS,
    tag: TAG,
    description: DESCRIPTION,
    includeNativeTxs: true,
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
