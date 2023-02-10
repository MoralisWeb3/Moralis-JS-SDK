import { Inquirer } from '@create-moralis-dapp/toolkit';

export class ExpressInquirer {
  public static async inquire() {
    const { inquire, commonQuestions } = Inquirer;

    return inquire([
      commonQuestions.confirmBeta,
      commonQuestions.name,
      commonQuestions.moralisApiKey,
      commonQuestions.packageManager,
    ]);
  }
}
