import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { SubjectModel } from './../../core/models/subject.model';
import { OptionModel } from './../../core/models/option.model';
import { QuestionModel } from './../../core/models/question.model';
import { TestModel } from './../../core/models/test.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})



export class TestFormComponent implements OnInit {
	@Input() qC: number;
	@Input() oC: number;
	@Input() ready: boolean;
	@Input() s: SubjectModel;
	@Output() back = new EventEmitter();

	optionsArr: OptionModel[] = [];
	questionsArr: QuestionModel[] = [];
	formTest: TestModel;
	
  constructor(
  	private api: ApiService
  ) { }

  ngOnInit() {
  	this.formTest = new TestModel("", null);
   	this._getQuestionArrays();
  }

  _getQuestionArrays(){
  	for(var i = 0; i < this.qC; i ++){
  		// make option model array 
  		let rec = this._getOptionArray();
  		this.questionsArr.push(new QuestionModel("", this.s.name, "",rec ));
  	}
  }

  _getOptionArray(){
  	let temp: OptionModel[] = [];
  	for(var i = 0; i < this.oC; i++){
  		temp.push(new OptionModel("An Option"));
  	}

  	return temp;
  }


  goBack(){
  	this.back.emit();
  }

  createTest(){
  	console.log(this.questionsArr);
  	console.log(this.optionsArr);
  }


  trackByIndex(index: number, value: any){
  	return index;
  }
}
