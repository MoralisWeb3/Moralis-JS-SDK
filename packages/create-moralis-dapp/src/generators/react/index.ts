import { join } from 'path';
import { addDependenciesToPackageJson, generateWithTemplate } from '../../utils';
import { askWeb3Lib } from './actions';

export const baseGenerator = async (name: string, destination: string, isClientServer: boolean) => {
  destination = isClientServer ? join(destination, 'client') : destination;
  try {
    const { web3Lib, dependencies } = await askWeb3Lib(destination);

    const templateDir = join(__dirname, './template');
    await generateWithTemplate(templateDir, destination, { web3Lib, name: isClientServer ? `${name}-client` : name });

    await addDependenciesToPackageJson(destination, [...dependencies]);
  } catch (e) {
    throw new Error(e);
  }
};
