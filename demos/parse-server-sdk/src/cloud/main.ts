/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
declare const Parse: any;
import './generated/evmApi';
import './generated/solApi';
import { requestMessage } from '../auth/authService';
import { MoralisCloudResolver } from '@moralisweb3/parse-server';
import Moralis from 'moralis';

Parse.Cloud.define('requestMessage', async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
    address,
    chain,
    networkType,
  });

  return { message };
});

Parse.Cloud.define('getPluginSpecs', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define('getServerTime', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});

Parse.Cloud.define('moralis', async ({ params: { moduleName, operationName, request } }: any) => {
  console.log('moduleName: ', moduleName);
  console.log('operationName: ', operationName);
  console.log('request: ', request);
  try {
    const l = (await MoralisCloudResolver.tryResolve(moduleName, operationName)?.fetch(request))?.toJSON();
    const web3ApiVersion = (await Moralis.EvmApi.utils.web3ApiVersion())?.toJSON();
    console.log('l:', l);
    console.log('web3ApiVersion:', web3ApiVersion);
    return l;
  } catch (e) {
    console.error(e);
    return e;
  }
});
