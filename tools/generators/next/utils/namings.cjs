const formatCapitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const getTargetMethod = (path) => path[path.length - 1];
const getHookHame = (path, removeFromHookName) => {
  let hookName = `use${path[0]}${formatCapitalize(getTargetMethod(path))}`;
  removeFromHookName.forEach((wordToRemove) => {
    hookName = hookName.replace(wordToRemove, '');
  });
  console.log('hookName: ', hookName);
  return hookName;
};
const getDomainFolderNames = (path) => path.slice(0, -1).join('/');
const getSDKCall = (path) => `Moralis.${path.join('.')}`;
const geAPIEndpoint = (path) => `/moralis/${path.join('/')}`;

module.exports = { getHookHame, getDomainFolderNames, getTargetMethod, getSDKCall, formatCapitalize, geAPIEndpoint };
