import { ApiUtilsConfigValues } from '@moralisweb3/api-utils';
import { MoralisCoreConfigValues } from '@moralisweb3/common-core';
import { MoralisNextHandlerParams } from './types';
import { RequestHandlerResolver } from '../RequestHandlerResolver';
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';

export type MoralisConfigValues = MoralisCoreConfigValues & ApiUtilsConfigValues;

async function MoralisNextHandler({ req, res }: MoralisNextHandlerParams) {
  const [moduleName, operationName] = req.query.moralis as string[];

  try {
    const requestHandler = RequestHandlerResolver.tryResolve(moduleName, operationName, Moralis.Core);
    if (!requestHandler) {
      return res.status(500).json({ error: `Operation ${moduleName}/${operationName} is not supported` });
    }

    const response = await requestHandler.handle(req.body);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}

const MoralisNextApi = (config: MoralisConfigValues) => {
  Moralis.start(config);
  return async (req: NextApiRequest, res: NextApiResponse) => MoralisNextHandler({ req, res });
};

export default MoralisNextApi;
