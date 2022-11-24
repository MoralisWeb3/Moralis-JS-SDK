module.exports = function (dependencies) {
  const { resolve } = dependencies;

  function loadCredentials(credentials) {
    // Prepare PKCS#12 data if available
    const pfx = resolve(credentials.pfx || credentials.pfxData);

    // Prepare Certificate data if available.
    const cert = resolve(credentials.cert || credentials.certData);

    // Prepare Key data if available
    const key = resolve(credentials.key || credentials.keyData);

    return { pfx, cert, key, passphrase: credentials.passphrase };
  }

  return loadCredentials;
};
