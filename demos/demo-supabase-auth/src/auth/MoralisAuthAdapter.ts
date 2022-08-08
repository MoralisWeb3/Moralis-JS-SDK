import Moralis from 'moralis';

function validateAuthData(authData: any) {
  const { message, signature, network, id, authId } = authData;

  return Moralis.Auth.verify({
    message: message,
    signature: signature,
    network: network,
  })
    .then((result) => {
      const data = result.toJSON();

      if (id === data.profileId && authId === data.id) {
        (authData.chainId = result.result.chain.decimal), (authData.nonce = data.nonce);
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

      // @ts-ignore
      throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Moralis auth failed, invalid data');
    })
    .catch(() => {
      // @ts-ignore
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
