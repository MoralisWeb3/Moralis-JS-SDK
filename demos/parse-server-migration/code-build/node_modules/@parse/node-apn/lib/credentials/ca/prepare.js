module.exports = function (dependencies) {
  const { resolve } = dependencies;

  function prepareCA(credentials) {
    // Prepare Certificate Authority data if available.
    let ca = [];

    if (credentials.ca !== null) {
      if (!Array.isArray(credentials.ca)) {
        credentials.ca = [credentials.ca];
      }
      ca = credentials.ca.map(resolve);
    }
    if (ca.length === 0) {
      ca = undefined;
    }

    return { ca };
  }

  return prepareCA;
};
