import { OperationResolver } from '@moralisweb3/api-utils';
import { MoralisNextHandlerParams } from '../MoralisNextApi/types';

export const authOperationNames = [
  'requestChallengeEvm',
  'requestChallengeSolana',
  'verifyChallengeEvm',
  'verifyChallengeSolana',
];

export interface MoralisNextAuthHandler extends MoralisNextHandlerParams {
  requestHandler: OperationResolver<unknown, unknown, unknown, unknown>;
  operationName: string;
}

export const moralisNextAuthHandler = async ({
  req,
  authentication,
  requestHandler,
  operationName,
}: MoralisNextAuthHandler) => {
  if (!authentication) {
    throw new Error(
      `Error running the '${operationName}' operation. No authentication config provided in 'pages/api/moralis/[...moralis].ts'`,
    );
  }
  switch (operationName) {
    case 'requestChallengeEvm':
    case 'requestChallengeSolana':
      return requestHandler.fetch({ ...req.body, ...authentication });
    case 'verifyChallengeEvm':
    case 'verifyChallengeSolana':
      return requestHandler.fetch(req.body);
    default:
      throw new Error(`${operationName} is not supported authentication operation`);
  }
};
