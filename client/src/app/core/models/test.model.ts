import { QuestionModel } from './question.model';

export class TestModel {
  constructor(public title: string,public questions: QuestionModel[], public _id?:string){}
}
