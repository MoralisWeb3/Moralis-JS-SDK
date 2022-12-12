const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const archiver = require('archiver');
const util = require('util');
const asyncExec = util.promisify(require('child_process').exec);

// Url to hosted github  pages
const HOSTED_PAGES = 'https://moralisweb3.github.io/Moralis-JS-SDK';

// Root URL of github demos
const GITHUB_DEMO_PATH = 'https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos';

// Compression level vor arciving the code to .zip
const COMPRESSION_LEVEL = 9;

// References to input folder names
const DIR_DEMO = 'demos';

// Reference to the output folders
const OUT_DIR_CODE = 'docs-out';
const OUT_DIR_DOCS = 'documentation/docs';

// Reference to the folder names in the output folder
const DEMOS_DIR = 'demos';
const CODE_DIR = 'code';
const CODE_WITH_BUILD_DIR = 'code-build';

const demoFolderPath = path.join(__dirname, '..', DIR_DEMO);
const outputCodePath = path.join(__dirname, '..', OUT_DIR_CODE, DEMOS_DIR);
const outputDocsPath = path.join(__dirname, '..', OUT_DIR_DOCS);

// List of demos that require to upload a full build (node_modules and build artefacts) as well
const fullBuild = ['parse-server-migration'];

const isFullBuild = (demoFolder) => fullBuild.includes(demoFolder);

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

  if (isFullBuild(name)) {
    const fullBuildOutPath = path.join(outputCodePath, name, CODE_WITH_BUILD_DIR, subPath);

    await fse.copySync(srcPath, fullBuildOutPath);
  }

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
 * Install and build for the demos that need a full build as well
 */
const createFullBuilds = async (demoFolders) => {
  await Promise.all(
    demoFolders.filter(isFullBuild).map(async (name) => {
      const pathToDemo = path.join(outputCodePath, name, CODE_WITH_BUILD_DIR);

      await asyncExec('yarn install', { cwd: pathToDemo });
      await asyncExec('yarn build', { cwd: pathToDemo });
    }),
  );
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
const getFullBuildCodePath = (name) => `${HOSTED_PAGES}/${DEMOS_DIR}/${name}/${CODE_WITH_BUILD_DIR}`;
const getFullbuildDownloadName = (name) => `${name}-build.zip`;

/**
 * Creates a .zip file for a demo project
 */
const createAchive = (folder, fileName, codePath) => {
  console.log(`⏳ Creating archive for ${fileName}..`);
  const output = fs.createWriteStream(path.join(outputCodePath, folder, fileName));
  const archive = archiver('zip', {
    zlib: { level: COMPRESSION_LEVEL },
  });

  return new Promise((resolve, reject) => {
    output.on('close', function () {
      console.log(`✅ Created archive for ${fileName} with ${archive.pointer()} total bytes`);
      resolve();
    });

    output.on('end', function () {
      console.log(`⚠️ Data has been drained archive for ${fileName}`);
    });

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
        console.warn(err);
        console.log(`⚠️ Warning on creating archive for ${fileName}: ${err}`);
      } else {
        // throw error
        reject(err);
      }
    });

    archive.on('error', function (err) {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(path.join(outputCodePath, folder, codePath), false);
    archive.finalize();
  });
};

/**
 * Create archives for all demo projects
 */
const createAllAchives = async (demoFolders) => {
  // Create archive for all demos
  await Promise.all(demoFolders.map((folder) => createAchive(folder, getDownloadName(folder), CODE_DIR)));

  // Create archives for full build demos
  await Promise.all(
    demoFolders
      .filter(isFullBuild)
      .map((folder) => createAchive(folder, getFullbuildDownloadName(folder), CODE_WITH_BUILD_DIR)),
  );
};

/**
 * Create a data object, used in the info json file
 */
const createInfo = (name) => ({
  name,
  github: getGithubUrl(name),
  download: getDownloadPath(name),
  code: getCodePath(name),
  ...(isFullBuild(name) ? { fullBuildCode: getFullBuildCodePath(name) } : {}),
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
  let markdown = `${makeMarkdownHeader(demoData)}`;

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
const createMarkdownFiles = async (demosData, readmeData) => {
  fs.mkdirSync(path.join(outputDocsPath, `demos`));
  await Promise.all(
    demosData.map(async (demoData) => {
      const markdown = generateDemoMarkdown(demoData, readmeData[demoData.name]);

      const outPath = path.join(outputDocsPath, `demos/${demoData.name}.md`);
      await fs.writeFileSync(outPath, markdown);
    }),
  );
};

/**
 * Get all demo folders
 */
const getAllDemoFolders = async () =>
  fs
    .readdirSync(demoFolderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

/**
 * Run all the code
 */
const buildDemoDocs = async () => {
  const demoFolders = await getAllDemoFolders();

  await ensureAllCleanOutputDir(demoFolders);
  await copyAllDemosToDocs(demoFolders);
  await createFullBuilds(demoFolders);
  await createAllAchives(demoFolders);
  const readmeData = await getAllReadmeData(demoFolders);
  const demosData = createDemoData(demoFolders);
  await createMarkdownFiles(demosData, readmeData);
  await createInfoJson(demosData);
};

module.exports = { buildDemoDocs };
