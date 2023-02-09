import { prompt, QuestionCollection, Answers } from 'inquirer';

export class Inquirer {
  public static inquire<TQ extends Answers>(questions: QuestionCollection<TQ>) {
    return prompt(questions);
  }
}
