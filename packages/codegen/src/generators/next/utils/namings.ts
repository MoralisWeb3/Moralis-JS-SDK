import _ from 'lodash';

/**
 * Returns splitted SDK Path
 * @param sdkPath
 * @example SolApi.account.getPortfolio => ['Moralis', 'SolApi', 'account', 'getPortfolio']
 */
export const getSplittedSDKPath = (sdkPath: string) => {
  const splitted = sdkPath.split('.');
  if (!splitted?.length) {
    throw new Error('Not correct SDK Path');
  }
  return splitted;
};

/**
 * Returns target method name
 * @param sdkPath
 * @example SolApi.account.getPortfolio => getPortfolio
 */
export const getTargetMethod = (sdkPath: string) => {
  const pathSplitted = getSplittedSDKPath(sdkPath);

  // since `getSplittedSDKPath().length > 0`
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pathSplitted.pop()!;
};

/**
 * Returns hook name
 * Requires a list of "blacklisted" words,
 * they will be removed from final hook name
 * @example `SolApi.account.getPortfolio` => `useSolPortfolio`
 * @param sdkPath
 * @param removeFromHookName
 */
export const getHookName = (sdkPath: string, removeFromHookName: string[]) => {
  const domain = _.upperFirst(getSplittedSDKPath(sdkPath)[0]);
  let name = `use${domain}${_.upperFirst(getTargetMethod(sdkPath))}`;
  removeFromHookName.forEach((wordToRemove) => {
    name = name.replace(wordToRemove, '');
  });

  return name;
};

/**
 * Returns folder url path where hook will be added
 * @param sdkPath
 * @param hookName
 */
export const getFolderUrlPathForHook = (sdkPath: string, hookName: string) =>
  `${getSplittedSDKPath(sdkPath).slice(0, -1).join('/')}/${hookName}`;

/**
 * Returns NextJS API endpoint link
 * @param sdkPath
 * @example SolApi.account.getPortfolio => Moralis/SolApi/account/getPortfolio
 */
export const getApiUrl = (sdkPath: string) => getSplittedSDKPath(sdkPath).join('/');
