const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const archiver = require('archiver');
const cheerio = require('cheerio');

// Url to hosted github  pages
const HOSTED_PAGES = 'https://moralisweb3.github.io/Moralis-JS-SDK';

// reference to https://docs.moralis.io/docs/nodejs-examples
const DOCS_PARENT_ID = '6306c1e34ab6a100ab077bb8';
// id for the technical references
const DOCS_CATEGORY_ID = '630696f4ab47c500b41899b7';
// Root URL of github examples
const GITHUB_DEMO_PATH = 'https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos';

// Compression level vor arciving the code to .zip
const COMPRESSION_LEVEL = 9;

// References to our folder names
const DEMO_FOLDER_DIR = 'demos';
const ASSETS_FOLDER_DIR = 'assets';
const OUT_FOLDER_DIR = 'pages';
const DOCS_FOLDER_DIR = 'docs';
// Reference to the output example folder inside the docs folder
const OUT_EXAMPLE_FOLDER_DIR = 'examples';
// Reference to the code output inside the examples folder
const CODE_DIR = 'code';

const demoFolderPath = path.join(__dirname, '..', DEMO_FOLDER_DIR);
const assetsFolderPath = path.join(__dirname, '..', ASSETS_FOLDER_DIR);
const assetsExamplesFolderPath = path.join(__dirname, '..', ASSETS_FOLDER_DIR, 'examples');
const outputPath = path.join(__dirname, '..', OUT_FOLDER_DIR);
const outputExamplesPath = path.join(__dirname, '..', OUT_FOLDER_DIR, OUT_EXAMPLE_FOLDER_DIR);
const docsPath = path.join(__dirname, '..', DOCS_FOLDER_DIR);

const getAllFilesFromFolder = async (folderName) =>
  require('glob-fs')({ dotfiles: true }).readdirSync(`demos/${folderName}/**/*`);

/**
 * Making sure the output dir is created and empty
 */
const ensureCleanOutputDir = async (name) => {
  const dirPath = path.join(outputExamplesPath, name);

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

/**
 * Get all README content from the demos and store it in an object for lookup
 */
const getAllReadmeData = async (demoFolders) => {
  const data = await Promise.all(
    demoFolders.map(async (name) => {
      const files = await getAllFilesFromFolder(name);

      const readmeFilePath = files.find((name) => name.endsWith('README.md'));

      let readmeData = null;

      if (readmeFilePath) {
        readmeData = fs.readFileSync(readmeFilePath, 'utf8');
      }

      return { name, readmeData };
    }),
  );

  return data.reduce(
    (all, current) => ({
      ...all,
      [current.name]: current.readmeData,
    }),
    {},
  );
};

const getGithubUrl = (name) => `${GITHUB_DEMO_PATH}/${name}`;
const getDownloadName = (name) => `${name}.zip`;
const getDownloadPath = (name) => `${HOSTED_PAGES}/examples/${name}/${getDownloadName(name)}`;
const getCodePath = (name) => `${HOSTED_PAGES}/examples/${name}/${CODE_DIR}`;

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

const makeFrontMatter = (exampleData) => {
  return `---
title: "${exampleData.name}"
category: ${DOCS_CATEGORY_ID}
parentDoc: ${DOCS_PARENT_ID}
hidden: true
---
`;
};

const makeMarkdownHeader = (exampleData) => {
  return `[Download](${exampleData.download})

[View code](${exampleData.github})

---
`;
};

/**
 * Generate HTML index page for the examples
 */
const generateExampleMarkdown = (exampleData, readme) => {
  let markdown = `${makeFrontMatter(exampleData)}${makeMarkdownHeader(exampleData)}`;

  if (readme) {
    // Remove title header
    if (readme.startsWith('#')) {
      markdown += readme.substring(readme.indexOf('\n') + 1);
    } else {
      markdown += readme;
    }
  }

  return markdown;
};

/**
 * Create all markdown files for the examples in the docs folder
 */
createMarkdownFiles = async (examplesData, readmeData) => {
  await Promise.all(
    examplesData.map(async (exampleData) => {
      const markdown = generateExampleMarkdown(exampleData, readmeData[exampleData.name]);

      const outPath = path.join(docsPath, `nodejs-example-${exampleData.name}.md`);
      await fs.writeFileSync(outPath, markdown);
    }),
  );
};

/**
 * Run all the code
 */
const run = async () => {
  const demoFolders = await fs.readdirSync(demoFolderPath);

  await ensureAllCleanOutputDir(demoFolders);
  await copyAllDemosToDocs(demoFolders);
  await createAllAchives(demoFolders);
  const readmeData = await getAllReadmeData(demoFolders);
  const examplesData = createExamplesData(demoFolders);
  await createMarkdownFiles(examplesData, readmeData);
  await createInfoJson(examplesData);
};

run();
