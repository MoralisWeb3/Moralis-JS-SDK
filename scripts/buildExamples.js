const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const archiver = require('archiver');

// References to our folder names
const DEMO_FOLDER_DIR = 'demos';
const ASSETS_FOLDER_DIR = 'assets';
const DOCS_FOLDER_DIR = 'docs';
// Reference to the output example folder inside the docs folder
const DOCS_EXAMPLE_FOLDER_DIR = 'examples';
// Reference to the code output inside the examples folder
const CODE_DIR = 'code';
// Root URL of github examples
const GITHUB_DEMO_PATH = 'https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos';
// Compression level vor arciving the code to .zip
const COMPRESSION_LEVEL = 9;

const demoFolderPath = path.join(__dirname, '..', DEMO_FOLDER_DIR);
const assetsFolderPath = path.join(__dirname, '..', ASSETS_FOLDER_DIR);
const assetsExamplesFolderPath = path.join(__dirname, '..', ASSETS_FOLDER_DIR, 'examples');
const outputExamplesPath = path.join(__dirname, '..', DOCS_FOLDER_DIR, DOCS_EXAMPLE_FOLDER_DIR);

const getAllFilesFromFolder = async (folderName) =>
  require('glob-fs')({ dotfiles: true }).readdirSync(`demos/${folderName}/**/*`);

/**
 * Making sure the output dir is created and empty
 */
const ensureCleanOutputDir = async (name) => {
  const dirPath = path.join(outputExamplesPath, name);

  await fs.mkdirSync(dirPath, { recursive: true });
  await fse.emptyDirSync(dirPath);
};

/**
 * Making sure the all output dirs are created and empty, and no old files exists in the output dir
 */
const ensureAllCleanOutputDir = async (demoFolders) => {
  await fse.emptyDirSync(outputExamplesPath);
  await Promise.all(demoFolders.map((name) => ensureCleanOutputDir(name)));
};

/**
 * Copy the specified demo project to the output dir
 */
const copyDemoToDocs = async (name, filePath) => {
  const outputRootPath = `demos/${name}/`;
  const subPath = filePath.substring(outputRootPath.length);

  const srcPath = path.join(demoFolderPath, name, subPath);
  const outPath = path.join(outputExamplesPath, name, CODE_DIR, subPath);

  await fse.copySync(srcPath, outPath);

  return subPath;
};

/**
 * Copy all demo projects to the output dir
 */
const copyAllDemosToDocs = async (demoFolders) => {
  const info = await Promise.all(
    demoFolders.map(async (name) => {
      const files = await getAllFilesFromFolder(name);
      const outFiles = await Promise.all(files.map((file) => copyDemoToDocs(name, file)));

      return { name, files: outFiles };
    }),
  );

  return info;
};

const getGithubUrl = (name) => `${GITHUB_DEMO_PATH}/${name}`;
const getDownloadName = (name) => `${name}.zip`;
const getDownloadPath = (name) => `./${name}/${getDownloadName(name)}`;
const getCodePath = (name) => `./${name}/${CODE_DIR}`;

/**
 * Creates a .zip file for a demo project
 */
const createAchive = (folder) => {
  const output = fs.createWriteStream(path.join(outputExamplesPath, folder, getDownloadName(folder)));
  const archive = archiver('zip', {
    zlib: { level: COMPRESSION_LEVEL },
  });

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  output.on('end', function () {
    console.log('Data has been drained');
  });

  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
      console.warn(err);
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  archive.directory(path.join(outputExamplesPath, folder, CODE_DIR), false);

  archive.finalize();
};

/**
 * Create archives for all demo projects
 */
const createAllAchives = (demoFolders) => {
  return Promise.all(demoFolders.map((folder) => createAchive(folder)));
};

/**
 * Copy static index html, js and styling files for the example overview page
 */
const copyStaticFiles = async () => {
  await fse.copySync(assetsExamplesFolderPath, outputExamplesPath);
};

/**
 * Create a data object, used in the info json file
 */
const createInfo = (name) => ({
  name,
  github: getGithubUrl(name),
  download: getDownloadPath(name),
  code: getCodePath(name),
});

/**
 * Generates a json file with info on al the demo projects
 */
const createInfoJson = async (names) => {
  const outPath = path.join(outputExamplesPath, 'info.json');
  const now = new Date();
  const data = {
    generated: now,
    examples: names.map(createInfo),
  };
  await fse.writeJsonSync(outPath, data, { spaces: 2 });
};

/**
 * Run all the code
 */
const run = async () => {
  const demoFolders = await fs.readdirSync(demoFolderPath);

  await ensureAllCleanOutputDir(demoFolders);
  await copyAllDemosToDocs(demoFolders);
  await createAllAchives(demoFolders);
  await copyStaticFiles();
  await createInfoJson(demoFolders);
};

run();
