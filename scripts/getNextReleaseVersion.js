const semanticRelease = require('semantic-release');
const config = require('../release.config');
const pkg = require('../package.json');

const currentVersion = pkg.version;
// Plugins to exclude from the release.config (not needed to calculate the next version, and to avoid providing tokens etc.)
const excludePlugins = [
  '@semantic-release/npm',
  '@semantic-release/github',
  '@semantic-release/git',
];

const getNextReleaseVersion = async () => {
  const plugins = config.plugins.filter(plugin =>
    typeof plugin === 'string'
      ? !excludePlugins.includes(plugin)
      : !excludePlugins.includes(plugin[0])
  );
  config.plugins = plugins;
  config.dryRun = true;

  const result = await semanticRelease(config);

  if (!result) {
    // result === false when semanticRelease will not publish a new version
    return currentVersion;
  }

  return result.nextRelease.version;
};

module.exports = {
  getNextReleaseVersion,
};
