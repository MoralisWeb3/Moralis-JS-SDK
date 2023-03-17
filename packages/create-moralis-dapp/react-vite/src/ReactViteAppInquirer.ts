import { Inquirer } from '@create-moralis-dapp/toolkit';

export class ReactViteAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    return Inquirer.inquire(this.questions);
  }

  public static questions = [
    this.commonQuestions.confirmBeta,
    this.commonQuestions.name,
    this.commonQuestions.isMoralisUser,
    this.commonQuestions.moralisApiKey,
    this.commonQuestions.packageManager,
  ];
}
