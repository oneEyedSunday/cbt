import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { ResultService } from './../../core/result.service';
import { TestModel } from './../../core/models/test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  test_id: string;
  routeSub: Subscription;
  testSub: Subscription;
  test: TestModel;
  loading: boolean;
  error: boolean;
  questionCount: number;
  optionCount: number;
  answers:any[] = [];
  pageTitle = 'Take a test';
  submitTestSub: Subscription;

  constructor(
    private router: ActivatedRoute,
    private _router: Router,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title,
    private resultservice: ResultService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.routeSub = this.router.params
    .subscribe(param => {
      this.test_id = param['id'];
      this._getTest();
    });
  }

  private _getTest(){
    this.loading = true;
    this.testSub = this.api.getTestById$(this.test_id)
    .subscribe(res => {
      this.test = res;
      this.title.setTitle(this.pageTitle + ' | ' + this.test.title);
      this.questionCount = this._getQuestionCount();
      this.optionCount = this.test.questions[0].options.length;
      this._initAnswers();
      this.loading = false;
    },
    err => {
      console.error(err);
      this.loading = false;
      this.error = true;
    });
  }

  private _getQuestionCount(){
    return this.utils.questionCount(this.test.questions);
  }

  private _initAnswers(){
      for (var i =0; i < this.questionCount; i++){
        this.answers[i] = [];
        for(var j =0; j < this.optionCount; j++){
          this.answers[i][j] = false;
        }
      }
  }

  onSubmit(){
    // bind to a form
    // so you can use the form to check vals
    // or ngModel hack
    // let tickedpieces = [];
    let choices = [];
    for(var i=0; i < this.questionCount; i++){
      for(var j=0; j < this.optionCount; j++){
        if (this.answers[i][j] == true){
          // tickedpieces.push(i.toString() + j.toString());
          choices[i] = this.test.questions[i].options[j].text;
        }

      }
    }

    // redirect to page that shows score
    // pass score
    // if error show error
    // while on page
    // if no option as in attempted is ticked
    // choices array isnt set
    this.submitTestSub = this.api.markTest$(this.test_id, choices)
    .subscribe(data => this._handleTestSubmission(data));
    // perhaps use behaviour subject
    // or ngrx to store state.
    // or shared service


    // send a multidimensional array
    // with question as index
    // and the actual text of the chosen answer

    // console.log(tickedpieces);
    // console.log(choices);
  }

  private _handleTestSubmission(res){
    this.resultservice.set(res.result);
    this._router.navigate(['/result']);
  }

  trackByIndex(index: number){
    return index;
  }

  flick(indexQ: number, indexO:number){
    this.answers[indexQ][indexO] = !this.answers[indexQ][indexO];
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.testSub.unsubscribe();
    if(this.submitTestSub){
      this.submitTestSub.unsubscribe();
    }
  }

}
