import { join } from 'path';
import { generateWithTemplate } from '../../utils';

export const baseGenerator = async (name: string, destination: string, isClientServer: boolean) => {
  destination = isClientServer ? join(destination, 'server') : destination;
  try {
    const templateDir = join(__dirname, './template');
    await generateWithTemplate(templateDir, destination, { name: isClientServer ? `${name}-server` : name });
  } catch (e) {
    throw new Error(e);
  }
};
