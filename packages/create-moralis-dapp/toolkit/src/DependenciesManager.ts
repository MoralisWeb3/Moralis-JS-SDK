import path from 'path';
import { Executer } from './Executer';
import { FileSystemProcessor } from './FileSystemProcessor';

export type Dependency = {
  name: string;
  version: string;
};

export type PackageManager = 'yarn' | 'npm' | 'pnpm';

export class DependenciesManager {
  constructor(private readonly destination: string) {}

  public async addToPackageJson(dependencies: Dependency[]) {
    const packageJsonPath = path.join(this.destination, 'package.json');
    const packageJson = await FileSystemProcessor.readJSON(packageJsonPath);
    dependencies.forEach(({ name, version }) => {
      packageJson.dependencies[name] = version;
    });

    return FileSystemProcessor.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
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
