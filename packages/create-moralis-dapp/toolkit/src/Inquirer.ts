import prompts, { Choice } from 'prompts';
export class Inquirer {
  public static inquire<Question extends string = string>(
    questions: prompts.PromptObject<Question>[] | prompts.PromptObject<Question>,
  ) {
    return prompts(questions);
  }
  public static get commonQuestions() {
    return {
      name: {
        name: 'name',
        initial: 'moralis-dapp',
        message: 'What name would you like to use for your new project? ...',
        type: 'text',
      },
      moralisApiKey: {
        name: 'moralisApiKey',
        message: 'Input your Moralis Api key. You can find it on https://admin.moralis.io/web3apis',
        type: 'text',
      },
      packageManager: {
        name: 'packageManager',
        choices: [
          { title: 'yarn', value: 'yarn' },
          { title: 'npm', value: 'npm' },
          { title: 'pnpm', value: 'pnpm' },
        ] as Choice[],
        initial: 0,
        message: 'Select a package manager for installing dependencies ...',
        type: 'select',
      },
      confirmBeta: {
        name: 'confirmBeta',
        type: 'confirm',
        initial: true,
        message:
          'Note: This tool is still in beta, and in active development.\n Many changes and updates are coming, which may impact your experience.\n Reach out to us in forum.moralis.io or in our discord for any feedback.',
      },
    } as const;
  }
}
