import { Component, OnInit, Input, Output,OnDestroy, EventEmitter} from '@angular/core';
import { SubjectModel } from './../../core/models/subject.model';
import { OptionModel } from './../../core/models/option.model';
import { QuestionModel } from './../../core/models/question.model';
import { TestModel } from './../../core/models/test.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})



export class TestFormComponent implements OnInit, OnDestroy {
	@Input() qC: number;
	@Input() oC: number;
	@Input() ready: boolean;
  @Input() testname: string;
	@Input() s: SubjectModel;
	@Output() back = new EventEmitter();

  error: boolean;
  submitting:boolean;

	optionsArr: OptionModel[] = [];
	questionsArr: QuestionModel[] = [];
	formTest: TestModel;
  submitSub: Subscription;

  constructor(
  	private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.formTest = new TestModel("", null);
   	this._getQuestionArrays();
  }

  _getQuestionArrays(){
  	for(var i = 0; i < this.qC; i ++){
  		let rec = this._getOptionArray();
  		this.questionsArr.push(new QuestionModel("", this.s.name, "",rec ));
  	}
  }

  _getOptionArray(){
  	let temp: OptionModel[] = [];
  	for(var i = 0; i < this.oC; i++){
  		temp.push(new OptionModel(""));
  	}

  	return temp;
  }


  goBack(){
  	this.back.emit();
  }

  createTest(){
  	console.log(this.questionsArr);
    this.submitSub = this.api.postTest$(this.testname, this.questionsArr)
    .subscribe( data => this._handleSubmitSuccess(data), err => this._handleSubmitError(err));
  }

  private _handleSubmitSuccess(res){
    this.error = false;
    this.submitting = false;
    // Redirect to test page
    this.router.navigate(['/test', res._id]);
  }

  private _handleSubmitError(err){
    console.error(err);
    this.error = true;
    this.submitting = false;
  }

  ngOnDestroy(){
    if(this.submitSub){
      this.submitSub.unsubscribe();
    }
  }



  setAnswer(iQ:number,iO: number){
  	// console.log(`Option ${iO} of Question${iQ} has been marked as the answer`);
  	this.questionsArr[iQ].answer = this.questionsArr[iQ].options[iO].text;
  	// console.log(this.questionsArr[iQ].options[iO].text);
  }

  touched(iQ:number, iO:number){
  	console.log(!!this.questionsArr[iQ].options[iO].text);
  	return !!(this.questionsArr[iQ].options[iO].text);
  }
}
