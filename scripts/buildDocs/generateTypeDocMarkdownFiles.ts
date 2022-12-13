import { runChildProcess } from '../utils/childProcess';
import { paths } from './constants';

export const generateTypeDocMarkdownFiles = () => {
  console.log(`⏳ Generating Typedoc markdown files...`);
  runChildProcess(`yarn --cwd "${paths.projectRoot}" typedoc`);
  console.log(`✅ Generated Typedoc markdown files`);
};
