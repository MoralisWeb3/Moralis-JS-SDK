const formatCapitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const getTargetMethod = (path) => path[path.length - 1];
const getHookHame = (path) => `use${path[0]}${formatCapitalize(getTargetMethod(path))}`;
const getDomainFolderNames = (path) => path.slice(0, -1).join('/');
const getSDKCall = (path) => `Moralis.${path.join('.')}`;
// const getHookHame = (path) => `use${path.split('/')}`

module.exports = { getHookHame, getDomainFolderNames, getTargetMethod, getSDKCall, formatCapitalize };
