const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const archiver = require('archiver');
const cheerio = require('cheerio');

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
 * Generates a data object of all examples
 */
const createExamplesData = (names) => {
  return names.map(createInfo);
};

/**
 * Generates a json file with data  of all examples
 */
const createInfoJson = async (examples) => {
  const outPath = path.join(outputExamplesPath, 'info.json');
  const now = new Date();
  const data = {
    generatedAt: now,
    examples,
  };
  await fse.writeJsonSync(outPath, data, { spaces: 2 });
};
const DOWNLOAD_ICON = `
<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="26" height="21" viewBox="0 0 26 21" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.17454 14.7681C8.58403 14.375 9.24796 14.375 9.65745 14.7681L13.1103 18.0827L16.5632 14.7681C16.9727 14.375 17.6366 14.375 18.0461 14.7681C18.4556 15.1612 18.4556 15.7985 18.0461 16.1916L13.8518 20.218C13.4423 20.6111 12.7784 20.6111 12.3689 20.218L8.17454 16.1916C7.76504 15.7985 7.76504 15.1612 8.17454 14.7681Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1103 9.44031C13.6894 9.44031 14.1589 9.89098 14.1589 10.4469V19.5062C14.1589 20.0622 13.6894 20.5128 13.1103 20.5128C12.5312 20.5128 12.0617 20.0622 12.0617 19.5062V10.4469C12.0617 9.89098 12.5312 9.44031 13.1103 9.44031Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.61601 0.375116C11.0426 0.325868 12.4622 0.587931 13.768 1.14158C15.0738 1.69522 16.2318 2.52602 17.1547 3.57143C17.8997 4.41531 18.4759 5.38129 18.857 6.42054L19.401 6.42054C20.7381 6.4197 22.0415 6.8278 23.1206 7.58564C24.2 8.34364 24.9996 9.41209 25.4036 10.6359C25.8075 11.8598 25.7947 13.1753 25.3669 14.3917C24.9392 15.6081 24.1188 16.662 23.0249 17.4004C22.5512 17.7202 21.8971 17.6108 21.564 17.1561C21.2309 16.7013 21.3448 16.0734 21.8186 15.7537C22.5479 15.2613 23.0948 14.5588 23.3799 13.7478C23.6651 12.9369 23.6736 12.0599 23.4043 11.244C23.1351 10.4281 22.6019 9.71579 21.8824 9.21046C21.1628 8.70513 20.2942 8.43305 19.4026 8.43372H18.0806C17.6019 8.43372 17.1839 8.12246 17.0649 7.67731C16.789 6.64494 16.2726 5.68612 15.5548 4.87302C14.837 4.05992 13.9363 3.41375 12.9207 2.98313C11.9051 2.55252 10.8009 2.34869 9.69138 2.387C8.58182 2.4253 7.49577 2.70474 6.51499 3.20427C5.53421 3.7038 4.68426 4.41041 4.02913 5.27091C3.37399 6.1314 2.93075 7.12335 2.73276 8.17208C2.53477 9.22082 2.58719 10.299 2.88609 11.3255C3.18499 12.3519 3.72256 13.2999 4.45835 14.0981C4.84213 14.5144 4.80168 15.1506 4.36799 15.519C3.9343 15.8874 3.27161 15.8486 2.88783 15.4323C1.94182 14.406 1.25065 13.1872 0.86635 11.8674C0.482055 10.5477 0.414649 9.16145 0.669208 7.81308C0.923766 6.46471 1.49366 5.18935 2.33597 4.083C3.17829 2.97665 4.27108 2.06815 5.53208 1.42589C6.79309 0.783639 8.18944 0.424363 9.61601 0.375116Z" fill="currentColor"></path>
</svg>
`;
const GITHUB_ICON = `
<svg class="icon" width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" fill="currentColor" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
</svg>
`;
const generateExampleSnippet = (exampleData) => `
<div class="example" id=${exampleData.name}>
  <h3>${exampleData.name}</h3>
  <div>
    <a class="link" href=${exampleData.github} target="_blank">${GITHUB_ICON} Github</a> <a class="link" href=${exampleData.download}>${DOWNLOAD_ICON} Download</a>
  </div
</div>
`;

/**
 * Generate HTML index page for the examples
 */
const generateHtml = async (examplesData) => {
  const srcHtmlPath = path.join(assetsExamplesFolderPath, 'index.html');
  const srcHtml = await fs.readFileSync(srcHtmlPath);

  const $ = cheerio.load(srcHtml);

  const $examplesRoot = $('main#examples');

  examplesData.forEach((exampleData) => {
    $(generateExampleSnippet(exampleData)).appendTo($examplesRoot);
  });

  return $.html();
};

/**
 * Replace index.html in the output with content from the examples
 */
createHtmlPage = async (examplesData) => {
  const html = await generateHtml(examplesData);

  console.log(html);

  const outPath = path.join(outputExamplesPath, 'index.html');
  fs.writeFileSync(outPath, html);
};

/**
 * Run all the code
 */
const run = async () => {
  const demoFolders = await fs.readdirSync(demoFolderPath);

  // await ensureAllCleanOutputDir(demoFolders);
  // await copyAllDemosToDocs(demoFolders);
  // await createAllAchives(demoFolders);
  await copyStaticFiles();
  const examplesData = createExamplesData(demoFolders);
  await createHtmlPage(examplesData);
  // await createInfoJson(examplesData);
};

run();
