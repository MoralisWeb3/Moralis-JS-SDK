const fs = require('fs');
const path = require('path');

const PACKAGE_DIR_PATHS = ['packages', 'packages/common'];

function findPackages(dirPath) {
  const result = [];
  fs.readdirSync(dirPath).forEach((fileName) => {
    const filePath = path.join(dirPath, fileName);
    const packagePath = path.join(filePath, 'package.json');
    if (fs.statSync(filePath).isDirectory() && fs.existsSync(packagePath)) {
      result.push(filePath);
    }
  });
  return result;
}

function check(packagePath, exportPath) {
  const finalPath = path.join(packagePath, exportPath);
  if (!fs.existsSync(finalPath)) {
    throw new Error(`Invalid export path: ${exportPath} (package: ${packagePath})`);
  }
  console.log(`✅ ${exportPath} (${packagePath})`);
}

function checkTree(packagePath, values) {
  const exports = Object.values(values).map(Object.values).flat().map(Object.values).flat();
  exports.forEach((exportPath) => check(packagePath, exportPath));
}

const repositoryPath = path.resolve(__dirname, '..');
const allPackagePaths = PACKAGE_DIR_PATHS.map((p) => path.join(repositoryPath, p))
  .map(findPackages)
  .flat();

for (const packagePath of allPackagePaths) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  const json = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  json.main && check(packagePath, json.main);
  json.types && check(packagePath, json.types);
  json.typings && check(packagePath, json.typings);
  json.exports && checkTree(packagePath, json.exports);
  json.typesVersions && checkTree(packagePath, json.typesVersions);
}
