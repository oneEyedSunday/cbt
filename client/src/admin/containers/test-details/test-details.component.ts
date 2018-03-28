import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';

import { ApiService } from './../../../app/services';
import { ActivatedRoute , Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { SubjectModel } from './../../../app/core/models/subject.model';
import { Title } from '@angular/platform-browser';
import { UtilsService } from './../../../app/services/utils.service';
import { TestModel } from './../../../app/core/models/test.model';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-test-details',
  templateUrl: './test-details.component.html'
})

export class TestDetailsComponent implements OnInit, OnDestroy {
  test: TestModel;
  testId: string;
  Subjects: SubjectModel[];
  subjectId: string;
  routeSub: Subscription;
  tabSub: Subscription;
  loading: boolean;
  tab: string;
  // loaded: boolean
  error: boolean;
  testSub: Subscription;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public utils: UtilsService
  ){}

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.testId = params['id']
    })
    this.tabSub = this.route.queryParams.subscribe(queryParams => {
      this.subjectId = queryParams['subjectId'];
      this.tab = queryParams['tab'] || 'edit';
    })
    if (typeof this.testId !== 'undefined' ) this._getTest()
    this._getSubjects()
  }

  private _getTest() {
    this.loading = true;
    this.testSub = this.api
      .getTestById$(this.testId)
      .subscribe(
        res => {
          this.test = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  private _getSubjects(){
    this.api.getSubjects$()
      .subscribe(response => {
        this.Subjects = response
      })
  }

  selectSubjectHandler(event: string) {
    this.router.navigate([],{queryParams: {'subjectId': event}})
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe()
    this.tabSub.unsubscribe()
  }
}
