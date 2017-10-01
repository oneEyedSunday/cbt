import { OptionModel } from './option.model';

class QuestionModel{
  constructor(
    public text: string,
    public subject: string,
     public answer: string,
      public options: OptionModel [],
       public _id?: string){}
}

class formQM {
	constructor(public index: number, public text: string){
	}

	set(value: number){
		this.index = value;
	}

	get(){
		return this.index;
	}
}

export {formQM, QuestionModel};
