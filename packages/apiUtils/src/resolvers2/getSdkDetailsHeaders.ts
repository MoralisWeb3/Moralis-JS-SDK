import { Core } from '@moralisweb3/common-core';

export type Headers = { [key: string]: string };
enum Environment {
  BROWSER = 'browser',
  NODE = 'node',
}

const sdkNameForEnvironment: { [key in Environment]: string } = {
  [Environment.BROWSER]: 'Javascript SDK',
  [Environment.NODE]: 'NodeJS SDK',
};

const currentEnvironment = getEnvironment();

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
  if (detectIsBrowser()) {
    return Environment.BROWSER;
  }

  // Otherwise we use NodeJs as default
  // (in theory this will also account for other environments like webworker etc. but we don't support this at the moment)
  return Environment.NODE;
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

  // Otherwise we use the name based on the environment
  return sdkNameForEnvironment[environment];
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
