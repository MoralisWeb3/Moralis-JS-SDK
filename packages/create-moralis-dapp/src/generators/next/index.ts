import { Question, prompt } from 'inquirer';
import { join } from 'path';
import { addDependenciesToPackageJson, generateWithTemplate } from '../../utils';
import { askWeb3Lib } from './actions';
import axios from 'axios';

export const nextGenerator = async (name: string, destination: string) => {
  try {
    const { web3Lib, dependencies } = await askWeb3Lib(destination);

    const templateDir = join(__dirname, './template');

    const envQuestions: Question[] = [
      {
        name: 'MORALIS_API_KEY',
        message: '🧙 : Input your Moralis Api key. You can find it on https://admin.moralis.io/web3apis',
      },
      {
        name: 'NEXTAUTH_URL',
        message:
          '🧙 : Input your NextJS app URL. You can use "http://localhost:3000" for development. Change it before go production!',
        default: 'http://localhost:3000',
      },
    ];

    const envVars = await prompt(envQuestions);

    const { data: NEXTAUTH_SECRET } = await axios.get<string>('https://generate-secret.now.sh/32');

    await generateWithTemplate(templateDir, destination, { web3Lib, name, envVars: { ...envVars, NEXTAUTH_SECRET } });

    await addDependenciesToPackageJson(destination, [...dependencies]);
  } catch (e) {
    throw new Error(e);
  }
};
