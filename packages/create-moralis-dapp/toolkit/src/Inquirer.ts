import chalk from 'chalk';
import { exec } from 'child_process';
import { prompt, Answers, ListQuestion } from 'inquirer';

export type InquirerAnswers<TQuestions extends ReadonlyArray<Answers>> = Record<TQuestions[number]['name'], any>;
export class Inquirer {
  public static inquire<TQuestions extends ReadonlyArray<Answers>>(questions: TQuestions) {
    return prompt<InquirerAnswers<TQuestions>>(questions);
  }
  public static get commonQuestions() {
    return {
      name: {
        type: 'input',
        name: 'name',
        message: 'What name would you like to use for your new project?:',
        default: 'moralis-dapp',
        prefix: '🧙',
      },
      isMoralisUser: {
        type: 'list',
        name: 'isMoralisUser',
        prefix: '🧙',
        message: 'Do you already have a Moralis account?:',
        choices: [
          {
            name: `Yes ${chalk.gray('Will open a webpage where you can copy your API key')}`,
            value: 'start https://admin.moralis.io/web3apis',
          },
          {
            name: `No ${chalk.gray('Will open a webpage where you can register for free')}`,
            value: 'start https://admin.moralis.io/register',
          },
        ],
        filter: (answer) => {
          exec(answer);
          return answer;
        },
      } as ListQuestion,
      moralisApiKey: {
        name: 'moralisApiKey',
        message: 'Insert your Moralis API Key. (Copy from https://admin.moralis.io/web3apis):',
        type: 'input',
        prefix: '🧙',
        default: null,
      },
      packageManager: {
        type: 'list',
        name: 'packageManager',
        prefix: '🧙',
        message: 'Choose a package manager for installing dependencies:',
        choices: ['yarn', 'npm', 'pnpm'],
        default: 'yarn',
      },
      confirmBeta: {
        name: 'confirmBeta',
        type: 'confirm',
        default: true,
        prefix: '🧙',
        message:
          'Note: This tool is still in beta, and in active development.\n Many changes and updates are coming, which may impact your experience.\n Reach out to us in forum.moralis.io or in our discord for any feedback.',
      },
    } as const;
  }
}
