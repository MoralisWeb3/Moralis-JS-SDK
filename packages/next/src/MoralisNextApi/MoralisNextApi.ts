import { MoralisNextApiParams, MoralisNextHandlerParams } from './types';
import { RequestHandlerResolver } from './RequestHandlerResolver';
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOperationNames, moralisNextAuthHandler } from '../auth/moralisNextAuthHandler';
import { isMoralisError } from '@moralisweb3/common-core';
import { serverLogger } from '../serverLogger';

const FALLBACK_ERROR_MESSAGE = 'Internal Server Error';

async function MoralisNextHandler({ req, res, authentication }: MoralisNextHandlerParams) {
  const [moduleName, operationName] = req.query.moralis as string[];

  try {
    const requestHandler = RequestHandlerResolver.tryResolve(moduleName, operationName);
    if (!requestHandler) {
      return res.status(400).json({ error: `Operation ${moduleName}/${operationName} is not supported` });
    }

    let response;

    if (authOperationNames.includes(operationName)) {
      response = await moralisNextAuthHandler({ req, res, authentication, requestHandler, operationName });
    } else {
      response = await requestHandler.fetch(req.body);
    }

    return res.status(200).json(response);
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.status(500).json({ error: FALLBACK_ERROR_MESSAGE });
    }

    let statusCode = 500;
    let message = FALLBACK_ERROR_MESSAGE;

    if (isMoralisError(error) && typeof error.details?.status === 'number') {
      statusCode = error.details.status;
      message = error.message;
    }

    serverLogger.error(`Unknown error in MoralisNextApi: ${error.message}`, { error });

    return res.status(statusCode).json({ error: message });
  }
}

const MoralisNextApi = ({ authentication, ...config }: MoralisNextApiParams) => {
  if (!Moralis.Core.isStarted) {
    Moralis.start(config);
  }

  return async (req: NextApiRequest, res: NextApiResponse) => MoralisNextHandler({ req, res, authentication });
};

export default MoralisNextApi;
