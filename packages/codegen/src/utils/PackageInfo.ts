import glob from 'glob';
import { packagesPath } from './constants';
import path from 'path';
import fs from 'fs';

const readMaybeFile = (pathUrl: string) => {
  if (fs.existsSync(pathUrl)) {
    return fs.readFileSync(pathUrl, 'utf8');
  }
  return null;
};

export interface MoralisMetadata {
  title?: string;
  type?: string;
  description?: string;
  deprecated?: boolean;
}

export interface PackageJson {
  name: string;
  version: string;
  moralis?: MoralisMetadata;
  private?: boolean;
}

export class PackageData {
  constructor(
    public fullPath: string,
    public packageJson: PackageJson,
    public readme: null | string,
    public changelog: null | string,
  ) {}

  static create(packagePath: string) {
    const packageJsonPath = path.join(packagesPath, packagePath);
    const directory = path.dirname(packageJsonPath);
    const readmePath = path.join(directory, 'README.md');
    const changelogPath = path.join(directory, 'CHANGELOG.md');

    const packageFileContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageFileJson = JSON.parse(packageFileContent) as PackageJson;
    const readme = readMaybeFile(readmePath);
    const changelog = readMaybeFile(changelogPath);

    return new PackageData(directory, packageFileJson, readme, changelog);
  }

  get version() {
    return this.packageJson.version;
  }

  get name() {
    return this.packageJson.name;
  }

  get moralis() {
    return this.packageJson.moralis;
  }

  get title() {
    return this.moralis?.title ?? this.name;
  }

  get description() {
    return this.moralis?.description ?? `-`;
  }

  get type() {
    return this.moralis?.type ?? null;
  }

  get isPublishable() {
    return (this.packageJson.private ?? false) === false;
  }

  get isDeprecated() {
    return this.moralis?.deprecated === true;
  }
}

export class PackageInfo {
  constructor(public packages: PackageData[]) {}

  static create() {
    const packages = PackageInfo.getAllPackages().map(PackageData.create);
    return new PackageInfo(packages);
  }

  private static getAllPackages() {
    const allPackages = glob.sync('**/package.json', {
      cwd: packagesPath,
      ignore: '**/node_modules/**/*',
    });

    return allPackages;
  }
}
