/* eslint-disable no-console */
import { ActionType } from 'node-plop';
import { paths } from './constants';
import path from 'node:path';
import { PackageData, PackageInfo } from '../../../utils/PackageInfo';
import { markdownTable } from 'markdown-table';
import { packageTypeTitles } from './config';

const FALLBACK_TYPE = 'other';

const isSupportedPackageType = (pkg: PackageData) => {
  const isValid = pkg.type && Object.keys(packageTypeTitles).includes(pkg.type);
  if (!isValid) {
    console.warn(`Package ${pkg.name} omitted as the type "${pkg.type}" is not implemented`);
  }
  return isValid;
};
const isActivePackage = (pkg: PackageData) => pkg.isPublishable && !pkg.isDeprecated;
const hasMoralisMetadata = (pkg: PackageData) => pkg.moralis !== undefined;
const sortByPackageType = (typeA: string, typeB: string) =>
  Object.keys(packageTypeTitles).indexOf(typeA) - Object.keys(packageTypeTitles).indexOf(typeB);

const createMarkdownLink = (title: string, url: string) => `[${title}](${url})`;

export class ReadmeGenerator {
  private packageInfo: PackageInfo;

  constructor() {
    this.packageInfo = PackageInfo.create();
  }

  get packagesByType() {
    return this.packageInfo.packages
      .filter(isActivePackage)
      .filter(hasMoralisMetadata)
      .filter(isSupportedPackageType)
      .reduce<Record<string, PackageData[]>>((acc, pkg) => {
        const type = pkg.type ?? FALLBACK_TYPE;

        return {
          ...acc,
          [type]: [...(acc[type] ?? []), pkg],
        };
      }, {});
  }

  generatePackageTable = (packageType: string, rootPath: string) => {
    const packages = this.packagesByType[packageType];

    return `\
## ${packageTypeTitles[packageType].title}

${packageTypeTitles[packageType].description}

${markdownTable([
  ['package', 'changelog', 'description'],
  ...packages.map((pck) => [
    createMarkdownLink(pck.name, path.relative(rootPath, path.join(pck.fullPath, 'README.md'))),
    pck.changelog
      ? createMarkdownLink(pck.version, path.relative(rootPath, path.join(pck.fullPath, 'CHANGELOG.md')))
      : pck.version,
    pck.description,
  ]),
])}
`;
  };

  getAllPackagesTables({ rootPath }: { rootPath: string }) {
    const packageTypes = Object.keys(this.packagesByType);

    return `\
${packageTypes
  .sort(sortByPackageType)
  .map((pkg) => this.generatePackageTable(pkg, rootPath))
  .join('\n')}
`;
  }

  public get actions(): ActionType[] {
    return [
      {
        type: 'add',
        templateFile: path.join(paths.templates, 'README.md.hbs'),
        path: path.join(paths.root, 'README.md'),
        force: true,
        data: {
          packagesTables: this.getAllPackagesTables({ rootPath: paths.root }),
        },
      },
      {
        type: 'add',
        templateFile: path.join(paths.templates, 'README.md.hbs'),
        path: path.join(paths.umbrellaPackage, 'README.md'),
        force: true,
        data: {
          packagesTables: this.getAllPackagesTables({ rootPath: paths.umbrellaPackage }),
        },
      },
    ];
  }
}
