import fs from 'fs-extra';
import path from 'path';
import { Executer } from './Executer';

export type Dependency = {
  name: string;
  version: string;
};

export type PackageManager = 'yarn' | 'npm' | 'pnpm';

export class DependenciesManager {
  constructor(private readonly destination: string) {}

  public async addToPackageJson(dependencies: Dependency[]) {
    const packageJsonPath = path.join(this.destination, 'package.json');
    const packageJson = await fs.readJSON(packageJsonPath);
    dependencies.forEach(({ name, version }) => {
      packageJson.dependencies[name] = version;
    });

    return fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }

  public async install(packageManager?: PackageManager) {
    return Executer.withSpinner(
      this.getPackageManagerInstallCmd(packageManager),
      this.destination,
      `Installing dependencies via ${packageManager}`,
    );
  }

  private getPackageManagerInstallCmd(packageManager?: PackageManager) {
    switch (packageManager) {
      case 'yarn':
        return 'yarn install';
      case 'pnpm':
        return 'pnpm install';
      case 'npm':
      default:
        return 'npm install';
    }
  }
}
