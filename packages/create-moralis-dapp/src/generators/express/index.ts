import { Question, prompt } from 'inquirer';
import { join } from 'path';
import { generateWithTemplate } from '../../utils';

export const expressGenerator = async (name: string, destination: string, isFrontendWithBackend: boolean) => {
  try {
    destination = isFrontendWithBackend ? join(destination, 'server') : destination;

    const templateDir = join(__dirname, './template');

    const envQuestions: Question[] = [
      {
        name: 'MORALIS_API_KEY',
        message: '🧙 : Input your Moralis Api key. You can find it on https://admin.moralis.io/web3apis',
        type: 'password',
      },
    ];

    const envVars = await prompt(envQuestions);

    await generateWithTemplate(templateDir, destination, { name, envVars: { ...envVars } });
  } catch (e) {
    throw new Error(e);
  }
};
