import { MoralisNextApiParams, MoralisNextHandlerParams } from './types';
import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authOperationNames, moralisNextAuthHandler } from '../auth/moralisNextAuthHandler';
import { getModuleByName } from './Modules';
import { isMoralisError } from '@moralisweb3/common-core';
import { serverLogger } from '../serverLogger';

const FALLBACK_ERROR_MESSAGE = 'Internal Server Error';

async function MoralisNextHandler({ req, res, authentication, core }: MoralisNextHandlerParams) {
  const [moduleName, operationName] = req.query.moralis as string[];

  try {
    const module = getModuleByName(moduleName);
    const operation = module.getOperationByName(operationName);
    const deserialisedRequest = operation.deserializeRequest(req.body, core);
    const requestHandler = module.getRequestHandler(operation, core);

    if (!requestHandler) {
      return res.status(400).json({ error: `Operation ${moduleName}/${operationName} is not supported` });
    }

    let response;

    if (authOperationNames.includes(operationName)) {
      response = await moralisNextAuthHandler({ req, res, authentication, requestHandler, operation, core });
    } else {
      response = await requestHandler(deserialisedRequest);
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

  return async (req: NextApiRequest, res: NextApiResponse) =>
    MoralisNextHandler({ req, res, authentication, core: Moralis.Core });
};

export default MoralisNextApi;
