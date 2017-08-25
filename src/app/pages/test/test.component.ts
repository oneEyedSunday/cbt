import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
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

  constructor(private router: ActivatedRoute,
  private api: ApiService,
public utils: UtilsService) { }

  ngOnInit() {
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
      this.questionCount = this._getQuestionCount();
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

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.testSub.unsubscribe();
  }

}
