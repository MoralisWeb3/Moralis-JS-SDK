import { MoralisNextApiParams, MoralisNextHandlerParams } from './types';
import { RequestHandlerResolver } from './RequestHandlerResolver';
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOperationNames, moralisNextAuthHandler } from '../auth/moralisNextAuthHandler';

async function MoralisNextHandler({ req, res, authentication }: MoralisNextHandlerParams) {
  const [moduleName, operationName] = req.query.moralis as string[];

  try {
    const requestHandler = RequestHandlerResolver.tryResolve(moduleName, operationName);
    if (!requestHandler) {
      return res.status(500).json({ error: `Operation ${moduleName}/${operationName} is not supported` });
    }

    let response;

    if (authOperationNames.includes(operationName)) {
      response = await moralisNextAuthHandler({ req, res, authentication, requestHandler, operationName });
    } else {
      response = await requestHandler.fetch(req.body);
    }

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}

const MoralisNextApi = ({ authentication, ...config }: MoralisNextApiParams) => {
  if (!Moralis.Core.isStarted) {
    Moralis.start(config);
  }

  return async (req: NextApiRequest, res: NextApiResponse) => MoralisNextHandler({ req, res, authentication });
};

export default MoralisNextApi;
