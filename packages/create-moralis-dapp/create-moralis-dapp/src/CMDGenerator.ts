import { ConfirmQuestion, ListQuestion, Question, prompt } from 'inquirer';
import { AppGenerator } from '@create-moralis-dapp/toolkit';

export class CMDGenerator {
  constructor(private generators: AppGenerator[]) {}

  private get questions(): Question[] {
    const confirmBeta: ConfirmQuestion = {
      name: 'confirmBeta',
      type: 'confirm',
      message:
        'Note: This tool is still in beta, and in active development.\n Many changes and updates are coming, which may impact your experience.\n Reach out to us in forum.moralis.io or in our discord for any feedback.',
      validate(input, answers) {
        console.log({ input, answers });
        return true;
      },
    };

    const stack: ListQuestion = {
      type: 'list',
      name: 'stack',
      message: 'Select a core stack for your dApp ...',
      choices: this.generators.map((generator) => {
        return {
          name: generator.name,
          value: generator,
        };
      }),
      prefix: '🧙 :',
    };

    return [confirmBeta, stack];
  }

  public async run() {
    const { stack } = await prompt(this.questions);
    await stack.generate();
  }
}
