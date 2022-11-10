import { MoralisNextHandlerParams } from './types';
import { MoralisError } from '@moralisweb3/core';
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';
import supportedPaths from '../hooks/generated/supportedPaths.json';

const runMoralisSDKMethodByPath = (path: string[], args: Record<string, string>) => {
  let context = Moralis;
  const methods = path.map((type) => [type]);
  const targetMethod = methods.pop();
  methods.forEach((method) => {
    // @ts-ignore
    context = context[method];
  });
  // @ts-ignore
  return context[targetMethod].apply(context, [args]);
};

const getIsPathSupported = (path: string[]) =>
  supportedPaths.map((sdkPath) => sdkPath.join('/')).includes(path.join('/'));

async function MoralisNextHandler({ req, res }: MoralisNextHandlerParams) {
  const sdkParams = req.body;
  const { moralis: path } = req.query;

  if (!Array.isArray(path)) {
    return res.status(500).json({ error: 'API Path is too short' });
  }

  try {
    if (!getIsPathSupported(path)) {
      return res.status(500).json({ error: 'Not supported API path' });
    }
    const apiKey = process.env.MORALIS_API_KEY;
    await Moralis.start({ apiKey });
    const response = await runMoralisSDKMethodByPath(path, sdkParams);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: (e as MoralisError).message });
  }
}

const MoralisNextApi = () => {
  return async (req: NextApiRequest, res: NextApiResponse) => MoralisNextHandler({ req, res });
};

export default MoralisNextApi;
