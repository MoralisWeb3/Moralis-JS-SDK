export const formatCapitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
export const getTargetMethod = (path: string[]) => path[path.length - 1];
export const getHookHame = (path: string[], removeFromHookName: string[]) => {
  let hookName = `use${path[0]}${formatCapitalize(getTargetMethod(path))}`;
  removeFromHookName.forEach((wordToRemove) => {
    hookName = hookName.replace(wordToRemove, '');
  });
  return hookName;
};
export const getDomainFolderNames = (path: string[]) => path.slice(0, -1).join('/');
export const getSDKCall = (path: string[]) => `Moralis.${path.join('.')}`;
export const geAPIEndpoint = (path: string[]) => `/moralis/${path.join('/')}`;
