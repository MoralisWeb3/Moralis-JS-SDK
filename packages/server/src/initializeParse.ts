import { ConfigEnvironment, MoralisServerError, ServerErrorCode } from '@moralis/core';
import parse from 'parse';

// TODO: implement support for nodeJs and react-native
// TODO: maybe as different packages?/modules?
export const getParse = (environment: ConfigEnvironment) => {
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
  environment: ConfigEnvironment;
}) => {
  validateServerUrl(serverUrl);
  validateAppId(appId);

  const parse = await getParse(environment);

  // TODO: set masterkey when used
  parse.initialize(appId);
  parse.serverURL = serverUrl;

  // TODO set config for parse
  // TODO set coremanager values for parse
  // WIP

  // TODO: for react-native
  // import { AsyncStorage } from 'react-native';
  // Parse.setAsyncStorage(AsyncStorage);

  //TODO
  /**
   * setCryptoController
   * setInstallationController
   * setRESTController
   *
   * idemptotency?
   * secret?
   */

  return parse;
};
