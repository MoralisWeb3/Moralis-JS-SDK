import Core from '@moralisweb3/common-core';

export type Headers = { [key: string]: string };
enum Environment {
  BROWSER = 'browser',
  NODE = 'node',
  // webworker, jsdom, deno etc.
  OTHER = 'other',
}

const currentEnvironment = getEnvironment();

function detectIsNode() {
  try {
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
  } catch (error) {
    return false;
  }
}

function detectIsBrowser() {
  try {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  } catch (error) {
    return false;
  }
}

function getEnvironment() {
  if (detectIsNode()) {
    return Environment.NODE;
  }
  if (detectIsBrowser()) {
    return Environment.BROWSER;
  }

  return Environment.OTHER;
}

/**
 * Gets the platform name, this is the name of the SDK,
 * Note: previously this was always named 'JS SDK', now we separate by environment / package-origin
 */
function getSdkName(environment: Environment, product?: string) {
  // If the product is set in the config, we use this as a name, this is done in the SDKs like React/Next etc.
  if (product) {
    return product;
  }

  // For browser environment we name it Javascript SDK
  if (environment === Environment.BROWSER) {
    return 'Javascript SDK';
  }

  // Otherwise we use NodeJs SDK as default
  // (in theory this will also account for other environments like webworker etc. but we don't support this at the moment)
  return 'NodeJS SDK';
}

/**
 * Additional data for the api to specify SDK details of the request
 */
export const getSdkDetailsHeaders = (product?: string): Headers => {
  const sdkName = getSdkName(currentEnvironment, product);

  return {
    'x-moralis-platform': sdkName,
    'x-moralis-platform-version': Core.libVersion,
    'x-moralis-build-target': currentEnvironment,
  };
};
