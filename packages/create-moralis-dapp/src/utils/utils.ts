import { copy, readdirSync, readJson, readJsonSync, renameSync, statSync, writeJson } from 'fs-extra';
import { exec } from 'child_process';
import { join } from 'path';
import { renderFile } from 'ejs';
import { versions } from './versions';
import { writeFileSync } from 'fs';
import ora from 'ora';
import type { Answers } from 'inquirer';

export const getAllFilesPathsInDir = (parent: string): string[] => {
  let res: string[] = [];
  try {
    readdirSync(parent).forEach((c) => {
      const child = join(parent, c);
      try {
        const s = statSync(child);
        if (!s.isDirectory()) {
          res.push(child);
        } else if (s.isDirectory()) {
          res = [...res, ...getAllFilesPathsInDir(child)];
        }
      } catch (e) {
        console.error(e);
      }
    });
  } catch (e) {
    console.error(e);
  }
  return res;
};

export const normalizeTemplateFiles = async (destination: string, answers: Answers) => {
  const filePaths = getAllFilesPathsInDir(destination);
  filePaths.forEach(async (filePath) => {
    if (filePath.includes('.tmpl')) {
      const newContent = await renderFile(filePath, answers);
      writeFileSync(filePath, newContent);
      renameSync(filePath, filePath.replace('.tmpl', ''));
    }
  });
};

export const generateWithTemplate = async (templateDir: string, destination: string, answers: Answers) => {
  await copy(templateDir, destination);
  await normalizeTemplateFiles(destination, answers);
};

export const execAsync = (command: string, cwd: string) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ code: 0, stdout });
    });
  });
};

export const execWithSpinner = async (command: string, cwd: string, message: string) => {
  const spinner = ora(message).start();

  await execAsync(command, cwd)
    .then(() => spinner.succeed())
    .catch((e) => spinner.fail((e as Error).message));
};

export type Dependency = {
  name: string;
  version: string;
};

export type PackageManager = 'yarn' | 'npm' | 'pnpm';

export const getPackageManagerInstallCmd = (packageManager: PackageManager) => {
  switch (packageManager) {
    case 'yarn':
      return 'yarn install';
    case 'pnpm':
      return 'pnpm install';
    case 'npm':
    default:
      return 'npm install';
  }
};

export const installDepsWithPackageManager = async (packageManager: PackageManager, destination: string) => {
  return execWithSpinner(
    getPackageManagerInstallCmd(packageManager),
    destination,
    `Installing dependencies via ${packageManager}`,
  );
};

export const addDependenciesToPackageJson = (destination: string, dependencies: Dependency[]) => {
  const packageJsonPath = join(destination, 'package.json');
  const packageJson = readJsonSync(packageJsonPath);

  dependencies.forEach(({ name, version }) => {
    packageJson.dependencies[name] = version;
  });

  return writeJson(packageJsonPath, packageJson, { spaces: 2 });
};

export const addPrettier = async (destination: string) => {
  addDependenciesToPackageJson(destination, [{ name: 'prettier', version: versions.prettier }]);

  const packageJsonPath = join(destination, 'package.json');

  const packageJson = await readJson(packageJsonPath);

  const scriptsToAdd = [
    { name: 'format', script: 'yarn prettier . "**/*.+(js|ts|json)" --write' },
    {
      name: 'format:check',
      script: 'yarn prettier . "**/*.+(js|ts|json)" --check',
    },
  ];

  scriptsToAdd.forEach(({ name, script }) => {
    packageJson.scripts[name] = script;
  });

  return writeJson(packageJsonPath, packageJson, { spaces: 2 });
};
