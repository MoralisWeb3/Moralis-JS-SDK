module.exports = function (dependencies) {
  const { load, parse, validate, logger } = dependencies;

  function loadAndValidate(credentials) {
    const loaded = load(credentials);
    let parsed;
    try {
      parsed = parse(loaded);
    } catch (err) {
      logger(err);
      return loaded;
    }
    parsed.production = credentials.production;
    validate(parsed);
    return loaded;
  }

  return loadAndValidate;
};
