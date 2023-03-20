import { Inquirer } from '@create-moralis-dapp/toolkit';

export class ExpressAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    return Inquirer.inquire([
      this.commonQuestions.confirmBeta,
      this.commonQuestions.name,
      this.commonQuestions.moralisApiKey,
      this.commonQuestions.packageManager,
    ]);
  }
}
