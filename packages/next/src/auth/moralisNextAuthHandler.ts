import { UnknownOperationResolver } from '@moralisweb3/api-utils';
import { UnknownOperation } from '@moralisweb3/common-core';
import { MoralisNextHandlerParams } from '../MoralisNextApi/types';

export const authOperationNames = [
  'requestChallengeEvm',
  'requestChallengeSolana',
  'verifyChallengeEvm',
  'verifyChallengeSolana',
];

export interface MoralisNextAuthHandler extends MoralisNextHandlerParams {
  requestHandler: UnknownOperationResolver['fetch'];
  operation: UnknownOperation;
}

export const moralisNextAuthHandler = async ({
  req,
  authentication,
  requestHandler,
  operation,
  core,
}: MoralisNextAuthHandler) => {
  const operationName = operation.name;
  if (!authentication) {
    throw new Error(
      `Error running the '${operationName}' operation. No authentication config provided in 'pages/api/moralis/[...moralis].ts'`,
    );
  }

  const deserlialisedRequest = operation.deserializeRequest(req.body, core) as Record<string, unknown>;

  switch (operationName) {
    case 'requestChallengeEvm':
    case 'requestChallengeSolana':
      return requestHandler({ ...deserlialisedRequest, ...authentication });
    case 'verifyChallengeEvm':
    case 'verifyChallengeSolana':
      return requestHandler(deserlialisedRequest);
    default:
      throw new Error(`${operationName} is not supported authentication operation`);
  }
};
