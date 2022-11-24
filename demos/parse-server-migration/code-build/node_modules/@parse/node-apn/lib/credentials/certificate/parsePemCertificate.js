const forge = require('node-forge');

const APNCertificate = require('./APNCertificate');

function apnCertificateFromPem(certData) {
  if (!certData) {
    return null;
  }

  let pemMessages;
  try {
    pemMessages = forge.pem.decode(certData);
  } catch (e) {
    if (e.message.match('Invalid PEM formatted message.')) {
      throw new Error('unable to parse certificate, not a valid PEM file');
    }
  }
  const certificates = [];

  pemMessages.forEach(function (message) {
    if (!message.type.match(/CERTIFICATE$/)) {
      return;
    }
    const certAsn1 = forge.asn1.fromDer(message.body);
    const forgeCertificate = forge.pki.certificateFromAsn1(certAsn1);

    certificates.push(new APNCertificate(forgeCertificate));
  });
  return certificates;
}

module.exports = apnCertificateFromPem;
