import { BuildEnvironment, MoralisServerError, ServerErrorCode } from '@moralisweb3/core';
import parse from 'parse';

export const getParse = (environment: BuildEnvironment) => {
  switch (environment) {
    case 'browser':
      return parse;
    // case 'nodejs':
    // return import('parse/node').then((parse) => parse.default);
    // case 'react-native':
    // return import('parse/react-native').then((parse) => parse.default);
    default:
      throw new MoralisServerError({ code: ServerErrorCode.INVALID_PARSE_ENVIRONMENT, message: 'Invalid environment' });
  }
};

export function validateServerUrl(serverUrl: string | null): asserts serverUrl is string {
  if (!serverUrl) {
    throw new MoralisServerError({ code: ServerErrorCode.INVALID_APPID, message: 'No serverUrl provided' });
  }
}

export function validateAppId(appId: string | null): asserts appId is string {
  if (!appId) {
    throw new MoralisServerError({ code: ServerErrorCode.INVALID_APPID, message: 'No appId provided' });
  }
}

/**
 * Initialises the Parse instance with all required params that are required for the MoralisServer to work properly
 * Without having this initialisation happen succesfully, we will have no access to the server,
 * and thus most Parse functionalities will not work.
 */
export const initializeParse = async ({
  appId,
  serverUrl,
  environment,
}: {
  appId: string | null;
  serverUrl: string | null;
  environment: BuildEnvironment;
}) => {
  validateServerUrl(serverUrl);
  validateAppId(appId);

  const parse = await getParse(environment);

  parse.initialize(appId);
  parse.serverURL = serverUrl;

  return parse;
};
