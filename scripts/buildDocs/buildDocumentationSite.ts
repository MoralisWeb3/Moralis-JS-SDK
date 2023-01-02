import { runChildProcess } from '../utils/childProcess';
import { paths } from './constants';

export const buildDocumentationSite = () => {
  console.log(`⏳ Build documentation site...`);
  runChildProcess(`yarn --cwd "${paths.projectRoot}" documentation/ build --out-dir "${paths.outRoot}"`);
  console.log(`✅ Build documentation site to ${paths.outRoot}`);
};
