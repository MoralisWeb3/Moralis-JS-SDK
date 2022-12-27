import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import archiver from 'archiver';
import glob from 'glob';
import { DOWNLOAD_COMPRESSION_LEVEL, paths } from './constants';
import { getAllDemoFolders } from './getAllDemoFolders';
import { getDownloadName } from './buildDemoReadmes';

/**
 * Get any source file from the specified path.
 * We use a glob pattern to search any file, and ignore files created by install/build process
 */
const getAllFilesFromDemoFolder = async (pathName: string) =>
  new Promise<string[]>((resolve, reject) => {
    glob(
      `**/*.*`,
      {
        cwd: pathName,
        // TODO: replace for ignore pattern from gitignore
        ignore: ['**/node_modules/**', '**/build/**', '**/lib/**', '**/logs/**', '.env', '.env.local', '**/.next/**'],
        dot: true,
      },
      function (er, files) {
        if (er) {
          reject(er);
        }
        resolve(files);
      },
    );
  });

const ensureEmptyTemp = () => {
  fse.removeSync(path.join(paths.projectRoot, 'temp'));
};

const copyToTemp = async (demoName: string, inputPath: string) => {
  const tempPath = path.join(paths.projectRoot, 'temp', demoName);
  const files = await getAllFilesFromDemoFolder(inputPath);

  files.forEach((file) => {
    fse.copySync(path.join(inputPath, file), path.join(tempPath, file));
  });

  return tempPath;
};

const createAchive = async (demoName: string, outputFileName: string, inputPath: string) => {
  const tempPath = await copyToTemp(demoName, inputPath);

  const outputPath = path.join(paths.outDownloads, outputFileName);
  fse.ensureDirSync(paths.outDownloads);
  console.log(`📦 Zipping ${inputPath} to ${outputPath}`);
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', {
    zlib: { level: DOWNLOAD_COMPRESSION_LEVEL },
  });

  return new Promise<number>((resolve, reject) => {
    output.on('close', function () {
      const bytes = archive.pointer();
      resolve(bytes);
    });

    output.on('end', function () {
      console.log(`❌ Data has been drained archive for ${outputFileName}`);
    });

    output.on('error', function (error) {
      throw error;
    });

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
        console.warn(err);
        console.log(`❌ Warning on creating archive for ${outputFileName}: ${err}`);
      } else {
        // throw error
        reject(err);
      }
    });

    archive.on('error', function (err) {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(tempPath, false);
    archive.finalize();
  });
};

const buildDemoDownload = async (demoName: string) => {
  const downloadName = getDownloadName(demoName);
  const codePath = path.join(paths.demosRoot, demoName);
  console.log(`⏳ Starting buildDemoDownload for ${demoName}`);

  const result = await createAchive(demoName, downloadName, codePath);

  console.log(`✅ Completed buildDemoDownload for ${demoName} with ${result} bytes`);
};

export const buildDemoDownloads = async () => {
  console.log('⏳ Starting buildDemoDownloads');
  ensureEmptyTemp();

  const allDemoFolders = getAllDemoFolders();
  await Promise.all(allDemoFolders.map(buildDemoDownload));

  ensureEmptyTemp();

  console.log('✅ Complete buildDemoDownloads');
};
