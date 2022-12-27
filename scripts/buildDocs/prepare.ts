import fse from 'fs-extra';
import { paths } from './constants';
import { runChildProcess } from '../utils/childProcess';

const clearDir = (path: string) => {
  fse.emptyDirSync(path);
  console.log(`✅ Cleared ${path}`);
};

export const prepareBuildDocs = () => {
  console.log('⏳ Starting prepareBuildDocs');
  clearDir(paths.outRoot);
  clearDir(paths.documentationApi);
  clearDir(paths.documentationDemos);
  console.log('✅ Complete prepareBuildDocs');
};

export const prepareDocsSite = () => {
  console.log(`⏳ Install dependencies for documentation site...`);
  runChildProcess(`yarn --cwd "${paths.projectRoot}" documentation/ install`);
  console.log(`✅ Installed dependencies for documentation site`);
};
