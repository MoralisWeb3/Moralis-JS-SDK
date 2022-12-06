const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const PACKAGE_DIR_PATHS = ['packages', 'packages/common', 'packages/client', 'packages/client/adapter'];

const SKIP_DIRECTORIES = ['lib', 'integration', 'node_modules'];

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

function findFilesWithExt(rootDirPath, ext, ignoreExt, ignoredDirectoryNames) {
  const result = [];
  function iterate(dirPath) {
    fs.readdirSync(dirPath).forEach((fileName) => {
      const filePath = path.join(dirPath, fileName);
      if (fs.statSync(filePath).isDirectory() && !ignoredDirectoryNames.includes(fileName)) {
        iterate(filePath);
      } else if (fileName.endsWith(ext) && !fileName.endsWith(ignoreExt)) {
        result.push(filePath);
      }
    });
  }
  iterate(rootDirPath);
  return result;
}

function readTsFilesExternalImports(filePaths) {
  const imports = new Set();
  const program = ts.createProgram(filePaths, {});
  for (const tsFilePath of filePaths) {
    const sourceFile = program.getSourceFile(tsFilePath);
    for (const imp of sourceFile.imports) {
      const importPath = imp.text;
      if (!importPath.startsWith('../') && !importPath.startsWith('./')) {
        imports.add(importPath);
      }
    }
  }
  return [...imports];
}

function readImports(tsFilePaths) {
  return readTsFilesExternalImports(tsFilePaths).map((imp) => {
    const hasSlash = imp.includes('/');
    if (!hasSlash) {
      return imp;
    }
    const nameParts = imp.split('/');
    const isScopePackage = imp.includes('@');

    if (isScopePackage) {
      return `${nameParts[0]}/${nameParts[1]}`;
    }

    return nameParts[0];
  });
}

function findPackageMissingDependencies(packageDirPath) {
  const packageJsonPath = path.join(packageDirPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  if (packageJson.private) {
    return null;
  }
  const packageDependencies = { ...(packageJson?.dependencies || {}), ...(packageJson?.devDependencies || {}) };
  const dependenciesList = Object.keys(packageDependencies || {});

  const tsFilePaths = findFilesWithExt(packageDirPath, '.ts', '.test.ts', SKIP_DIRECTORIES);
  const imports = readImports(tsFilePaths);

  const missing = imports.reduce((result, imp) => {
    if (!dependenciesList.includes(imp)) {
      result.push(imp);
    }
    return result;
  }, []);
  return { missing, total: imports.length };
}

const repositoryPath = path.resolve(__dirname, '..');
const allPackagePaths = PACKAGE_DIR_PATHS.map((p) => path.join(repositoryPath, p))
  .map(findPackages)
  .flat();

let exitCode = 0;

for (const packagePath of allPackagePaths) {
  const packageName = packagePath.replace(repositoryPath, '');
  const result = findPackageMissingDependencies(packagePath);
  if (!result) {
    console.log(`⏩ Package ${packageName} is private`);
  } else if (result.missing.length > 0) {
    console.log(`❌ Package ${packageName} has missing dependencies:\n* ${result.missing.join('\n* ')}\n`);
    exitCode = 1;
  } else {
    console.log(`✅ Package ${packageName} is valid (${result.total} dependencies)`);
  }
}

process.exit(exitCode);
