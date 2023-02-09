import { ListQuestion as InqListQuestion, Question as InqQuestion } from 'inquirer';
export interface AppGenerator {
  name: string;
  generate(): Promise<void>;
}

export interface ListQuestion extends InqListQuestion {}
export interface Question extends InqQuestion {}
