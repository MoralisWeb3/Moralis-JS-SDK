/**
 * Updates the dist files with the new version during the publish process.
 * Needs to be called with the next version as argument.
 */

const path = require('path');
const fs = require('fs');
const pck = require('../package.json');

const VERSION_PLACEHOLDER = '<MORALIS_VERSION>';
const DIST_FOLDER = '../dist';

const args = process.argv.slice(2);
const oldVersion = pck.version;
const nextVersion = args[0] || oldVersion;

const distPath = path.join(__dirname, DIST_FOLDER);
const distFiles = fs.readdirSync(distPath);

distFiles.forEach(distFile => {
  const filePath = path.join(distPath, distFile);
  let fileData = fs.readFileSync(filePath, 'utf8');

  fileData = fileData.replace(VERSION_PLACEHOLDER, nextVersion);

  fs.writeFileSync(filePath, fileData);
});
