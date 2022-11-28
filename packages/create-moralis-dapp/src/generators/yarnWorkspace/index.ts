import { join } from 'path';
import { generateWithTemplate } from '../../utils';

export const yarnWorkspaceGenerator = async (name: string, destination: string) => {
  try {
    const templateDir = join(__dirname, './template');
    await generateWithTemplate(templateDir, destination, { name });
  } catch (e) {
    throw new Error(e);
  }
};
