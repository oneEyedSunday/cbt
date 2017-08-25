export class QuestionModel{
  constructor(
    public text: string,
    public subject: string,
     public answer: string,
      public options: string [],
       public _id?: string){}
}
