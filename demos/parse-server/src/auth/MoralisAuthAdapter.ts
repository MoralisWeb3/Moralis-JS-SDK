// Note: do not import Parse dependency. see https://github.com/parse-community/parse-server/issues/6467
/* global Parse */
import Moralis from 'moralis';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateAuthData(authData: any) {
  const { message, signature, network, id, authId } = authData;
  return Moralis.Auth.verify({
    message,
    signature,
    network,
  })
    .then((result) => {
      const data = result.toJSON();

      if (id === data.profileId && authId === data.id) {
        if (authData.chainId) {
          authData.chainId = result.result.chain.decimal;
        }
        authData.nonce = data.nonce;
        authData.address = result.result.address.checksum;
        authData.version = data.version;
        authData.domain = data.domain;
        authData.expirationTime = data.expirationTime;
        authData.notBefore = data.notBefore;
        authData.resources = data.resources;
        authData.statement = data.statement;
        authData.uri = data.uri;
        return;
      }

      // @ts-ignore (see note at top of file)
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Moralis auth failed, invalid data');
    })
    .catch(() => {
      // @ts-ignore (see note at top of file)
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Moralis auth failed, invalid data');
    });
}

function validateAppId() {
  return Promise.resolve();
}

export default {
  validateAuthData,
  validateAppId,
};
