import { join } from 'path';
import { addDependenciesToPackageJson, generateWithTemplate } from '../../utils';
import { askWeb3Lib } from './actions';

export const nextGenerator = async (name: string, destination: string) => {
  try {
    const { web3Lib, dependencies } = await askWeb3Lib(destination);

    const templateDir = join(__dirname, './template');
    await generateWithTemplate(templateDir, destination, { web3Lib, name });

    await addDependenciesToPackageJson(destination, [...dependencies]);
  } catch (e) {
    throw new Error(e);
  }
};
