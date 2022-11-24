module.exports = function (dependencies) {
  const { parsePkcs12, parsePemKey, parsePemCert } = dependencies;
  function parse(credentials) {
    const parsed = {};

    parsed.key = parsePemKey(credentials.key, credentials.passphrase);
    parsed.certificates = parsePemCert(credentials.cert);

    const pkcs12Parsed = parsePkcs12(credentials.pfx, credentials.passphrase);
    if (pkcs12Parsed) {
      parsed.key = pkcs12Parsed.key;
      parsed.certificates = pkcs12Parsed.certificates;
    }

    return parsed;
  }

  return parse;
};
