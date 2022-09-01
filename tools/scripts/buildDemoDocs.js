const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const archiver = require('archiver');

// Url to hosted github  pages
const HOSTED_PAGES = 'https://moralisweb3.github.io/Moralis-JS-SDK';

// reference to https://docs.moralis.io/docs/nodejs-demos
const DOCS_PARENT_ID = '63074bbec5f3ae0a0b565cf6';
// id for the technical references
const DOCS_CATEGORY_ID = '630696f4ab47c500b41899b7';
// Root URL of github demos
const GITHUB_DEMO_PATH = 'https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos';

// Compression level vor arciving the code to .zip
const COMPRESSION_LEVEL = 9;

// References to input folder names
const DIR_DEMO = 'demos';

// Reference to the output folders
const OUT_DIR_CODE = 'pages';
const OUT_DIR_DOCS = 'docs';

// Reference to the folder names in the output folder
const DEMOS_DIR = 'demos';
const CODE_DIR = 'code';

const demoFolderPath = path.join(__dirname, '..', DIR_DEMO);
const outputCodePath = path.join(__dirname, '..', OUT_DIR_CODE, DEMOS_DIR);
const outputDocsPath = path.join(__dirname, '..', OUT_DIR_DOCS);

const getAllFilesFromFolder = async (folderName) =>
  require('glob-fs')({ dotfiles: true }).readdirSync(`demos/${folderName}/**/*`);

/**
 * Making sure the output dir is created and empty
 */
const ensureCleanOutputDir = async (name) => {
  const dirPath = path.join(outputCodePath, name);

  await fse.emptyDirSync(dirPath);
};

/**
 * Making sure the all output dirs are created and empty, and no old files exists in the output dir
 */
const ensureAllCleanOutputDir = async (demoFolders) => {
  await fse.emptyDirSync(outputCodePath);
  await Promise.all(demoFolders.map((name) => ensureCleanOutputDir(name)));
};

/**
 * Copy the specified demo project to the output dir
 */
const copyDemoToDocs = async (name, filePath) => {
  const outputRootPath = `demos/${name}/`;
  const subPath = filePath.substring(outputRootPath.length);

  const srcPath = path.join(demoFolderPath, name, subPath);
  const outPath = path.join(outputCodePath, name, CODE_DIR, subPath);

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
const getDownloadPath = (name) => `${HOSTED_PAGES}/${DEMOS_DIR}/${name}/${getDownloadName(name)}`;
const getCodePath = (name) => `${HOSTED_PAGES}/${DEMOS_DIR}/${name}/${CODE_DIR}`;

/**
 * Creates a .zip file for a demo project
 */
const createAchive = (folder) => {
  const output = fs.createWriteStream(path.join(outputCodePath, folder, getDownloadName(folder)));
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

  archive.directory(path.join(outputCodePath, folder, CODE_DIR), false);

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
 * Generates a data object of all demos
 */
const createDemoData = (names) => {
  return names.map(createInfo);
};

/**
 * Generates a json file with data  of all demos
 */
const createInfoJson = async (demos) => {
  const outPath = path.join(outputCodePath, 'info.json');
  const now = new Date();
  const data = {
    generatedAt: now,
    demos,
  };
  await fse.writeJsonSync(outPath, data, { spaces: 2 });
};

const makeFrontMatter = (demoData) => {
  return `---
title: "${demoData.name}"
category: ${DOCS_CATEGORY_ID}
parentDoc: ${DOCS_PARENT_ID}
hidden: false
---
`;
};

const makeMarkdownHeader = (demoData) => {
  return `[Download](${demoData.download})

[View code](${demoData.github})

---
`;
};

/**
 * Generate HTML index page for the demos
 */
const generateDemoMarkdown = (demoData, readme) => {
  let markdown = `${makeFrontMatter(demoData)}${makeMarkdownHeader(demoData)}`;

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
 * Create all markdown files for the demos in the docs folder
 */
createMarkdownFiles = async (demosData, readmeData) => {
  await Promise.all(
    demosData.map(async (demoData) => {
      const markdown = generateDemoMarkdown(demoData, readmeData[demoData.name]);

      const outPath = path.join(outputDocsPath, `nodejs-demo-${demoData.name}.md`);
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
  const demosData = createDemoData(demoFolders);
  await createMarkdownFiles(demosData, readmeData);
  await createInfoJson(demosData);
};

run();
