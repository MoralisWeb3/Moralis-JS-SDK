import Moralis from 'moralis';
// Note: do not import Parse dependency. see https://github.com/parse-community/parse-server/issues/6467

export function validateAuthData(authData, options) {
  const { message, signature, network, id, authId } = authData;

  return Moralis.Auth.verify({
    message: message,
    signature: signature,
    network: network,
  })
    .then((result) => {
      const data = result.toJSON();

      if (id === data.profileId && authId === data.id) {
        authData.chainId = data.chainId;
        authData.nonce = data.nonce;
        authData.address = data.address;
        authData.version = data.version;
        authData.domain = data.domain;
        authData.expirationTime = data.expirationTime;
        authData.notBefore = data.notBefore;
        authData.resources = data.resources;
        authData.statement = data.statement;
        authData.uri = data.uri;
        return;
      }

      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Moralis auth failed, invalid data');
    })
    .catch(() => {
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Moralis auth failed, invalid data');
    });
}

export function validateAppId(appIds, authData, options) {
  return Promise.resolve();
}

export default {
  validateAuthData,
  validateAppId,
};
