import { prompt, Answers } from 'inquirer';

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
        message: 'What name would you like to use for your new project? ...',
        default: 'moralis-dapp',
        prefix: '🧙 :',
      },
      moralisApiKey: {
        name: 'moralisApiKey',
        message: 'Input your Moralis Api key. You can find it on https://admin.moralis.io/web3apis',
        type: 'password',
        prefix: '🧙 :',
      },
      packageManager: {
        type: 'list',
        name: 'packageManager',
        message: '🧙 : Select a package manager for installing dependencies ...',
        choices: ['yarn', 'npm', 'pnpm'],
        default: 'yarn',
      },
      confirmBeta: {
        name: 'confirmBeta',
        type: 'confirm',
        default: true,
        message:
          'Note: This tool is still in beta, and in active development.\n Many changes and updates are coming, which may impact your experience.\n Reach out to us in forum.moralis.io or in our discord for any feedback.',
      },
    } as const;
  }
}
